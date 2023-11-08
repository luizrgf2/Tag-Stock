import { UserEntity } from 'src/app/core/entities/user';
import { Either, Left, Right } from 'src/app/core/errors/either';
import { ErrorBase } from 'src/app/core/errors/errorBase';
import { EmailError, EmailMessage } from 'src/app/core/errors/user/email';
import {
  PasswordError,
  PasswordMessage,
} from 'src/app/core/errors/user/password';
import {
  AuthUserUseCaseInput,
  AuthUserUseCaseInterface,
  AuthUserUseCaseOutput,
} from 'src/app/core/interfaces/useCases/user/authUser';
import { UserRepositoryInterface } from '../../interfaces/repository/user';
import { EncryptorInterface } from '../../interfaces/utils/encrypt';
import { AuthUserWhrogError } from '../../errors/user';
import { JsonWebTokenInterface } from '../../interfaces/utils/jwt';

export class AuthUserUseCase implements AuthUserUseCaseInterface {
  constructor(
    private readonly userRepo: UserRepositoryInterface,
    private readonly encryptor: EncryptorInterface,
    private readonly jwt: JsonWebTokenInterface,
  ) {}

  private createUserEntity(
    email: string,
    password: string,
  ): Either<ErrorBase, UserEntity> {
    const userData = new UserEntity({
      createdAt: new Date(),
      email: email,
      password: password,
      id: '',
      name: '',
      updatedAt: new Date(),
    });

    if (!UserEntity.isValidEmail(userData.user.email))
      return Left.create(new EmailError(EmailMessage.invalid));
    if (!UserEntity.isValidPassword(userData.user.password))
      return Left.create(new PasswordError(PasswordMessage.invalid));
    return Right.create(userData);
  }

  private async findUser(
    email: string,
  ): Promise<Either<ErrorBase, UserEntity>> {
    const userOrError = await this.userRepo.findByEmail(email);
    if (userOrError.left) return Left.create(userOrError.left);
    return Right.create(userOrError.right);
  }

  async exec(
    input: AuthUserUseCaseInput,
  ): Promise<Either<ErrorBase, AuthUserUseCaseOutput>> {
    const { email, password } = input;

    const userDataOrError = this.createUserEntity(email, password);
    if (userDataOrError.left) return Left.create(userDataOrError.left);

    const userOrError = await this.findUser(email);
    if (userOrError.left) return Left.create(userOrError.left);

    const passwordIsRight = await this.encryptor.compare(
      userOrError.right.user.password,
      password,
    );

    if (passwordIsRight.left) return Left.create(passwordIsRight.left);
    if (!passwordIsRight.right) return Left.create(new AuthUserWhrogError());

    userDataOrError.right.user.password = undefined;
    userDataOrError.right.user.updatedAt = userOrError.right.user.updatedAt;
    userDataOrError.right.user.createdAt = userOrError.right.user.createdAt;
    userDataOrError.right.user.id = userOrError.right.user.id;

    const token = await this.jwt.encrypt({
      id: userDataOrError.right.user.id,
    });
    if (token.left) return Left.create(token.left);

    return Right.create({
      jwt: token.right,
      user: userDataOrError.right.user,
    });
  }
}
