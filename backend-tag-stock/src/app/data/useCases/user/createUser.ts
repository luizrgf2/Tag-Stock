import { Either, Left, Right } from 'src/app/core/errors/either';
import { ErrorBase } from 'src/app/core/errors/errorBase';
import {
  CreateUserUseCaseInput,
  CreateUserUseCaseInterface,
  CreateUserUseCaseOutput,
} from 'src/app/core/interfaces/useCases/user/createUser';
import { UserRepositoryInterface } from '../../interfaces/repository/user';
import { UserAlreadyExists, UserNotExistsError } from '../../errors/user';
import { UserEntity, UserInterface } from 'src/app/core/entities/user';
import { EncryptorInterface } from '../../interfaces/utils/encrypt';

export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(
    private readonly userRepo: UserRepositoryInterface,
    private readonly encryptor: EncryptorInterface,
  ) {}

  private async checkIfEmailNotExists(
    email: string,
  ): Promise<Either<ErrorBase, boolean>> {
    const emailsExistsOrError = await this.userRepo.findByEmail(email);
    if (emailsExistsOrError.left instanceof UserNotExistsError)
      return Right.create(true);

    if (emailsExistsOrError.left) return Left.create(emailsExistsOrError.left);

    return Right.create(false);
  }

  private createUserEntity(
    name: string,
    email: string,
    password: string,
  ): Either<ErrorBase, UserEntity> {
    const userEntity = UserEntity.createWithValidations({
      email,
      name,
      password,
    });

    if (userEntity.left) return Left.create(userEntity.left);
    return Right.create(userEntity.right);
  }

  private async createUser(
    user: UserInterface,
  ): Promise<Either<ErrorBase, UserInterface>> {
    const createUser = await this.userRepo.create({ ...user });
    if (createUser.left) return Left.create(createUser.left);
    return Right.create(createUser.right.user);
  }

  async exec(
    input: CreateUserUseCaseInput,
  ): Promise<Either<ErrorBase, CreateUserUseCaseOutput>> {
    const { name, email, password } = input;

    const userDataOrError = this.createUserEntity(name, email, password);
    if (userDataOrError.left) return Left.create(userDataOrError.left);

    const emailsExistsOrError = await this.checkIfEmailNotExists(email);
    if (emailsExistsOrError.left) return Left.create(emailsExistsOrError.left);
    if (!emailsExistsOrError.right) return Left.create(new UserAlreadyExists());

    const passwordEncrypted = await this.encryptor.encrypt(
      userDataOrError.right.user.password,
    );
    if (passwordEncrypted.left) return Left.create(passwordEncrypted.left);

    userDataOrError.right.user.password = passwordEncrypted.right;

    const createUserOrError = await this.createUser(userDataOrError.right.user);
    if (createUserOrError.left) return Left.create(createUserOrError.left);

    userDataOrError.right.user.id = createUserOrError.right.id;
    userDataOrError.right.user.createdAt = createUserOrError.right.createdAt;
    userDataOrError.right.user.updatedAt = createUserOrError.right.updatedAt;

    return Right.create({
      user: {
        createdAt: userDataOrError.right.user.createdAt,
        updatedAt: userDataOrError.right.user.updatedAt,
        email: userDataOrError.right.user.email,
        id: userDataOrError.right.user.id,
        name: userDataOrError.right.user.name,
      },
    });
  }
}
