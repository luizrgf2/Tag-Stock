import { Either, Left, Right } from 'src/app/core/errors/either';
import { ErrorBase } from 'src/app/core/errors/errorBase';
import {
  AuthUserUseCaseInput,
  AuthUserUseCaseInterface,
  AuthUserUseCaseOutput,
} from 'src/app/core/interfaces/useCases/user/authUser';
import { UserRepositoryInterface } from '../../interfaces/repository/user';
import { UserEntity } from 'src/app/core/entities/user';
import { EncryptorInterface } from '../../interfaces/utils/encrypt';
import { AuthUserWhrogError } from '../../errors/user';
import { JsonWebTokenInterface } from '../../interfaces/utils/jwt';

export class AuthUserUseCase implements AuthUserUseCaseInterface {
  constructor(
    private readonly userRepo: UserRepositoryInterface,
    private readonly encryptor: EncryptorInterface,
    private readonly jwt: JsonWebTokenInterface,
  ) {}

  private async checkIfEmailsExists(
    email: string,
  ): Promise<Either<ErrorBase, UserEntity>> {
    const emailsExists = await this.userRepo.findByEmail(email);

    if (emailsExists.left) {
      return Left.create(emailsExists.left);
    }
    return Right.create(emailsExists.right);
  }

  async exec(
    input: AuthUserUseCaseInput,
  ): Promise<Either<ErrorBase, AuthUserUseCaseOutput>> {
    const { email, password } = input;

    const emailsExistsOrError = await this.checkIfEmailsExists(email);
    if (emailsExistsOrError.left) return Left.create(emailsExistsOrError.left);

    const comparePasswordOrError = await this.encryptor.compare(
      emailsExistsOrError.right.user.password,
      password,
    );

    if (comparePasswordOrError.left)
      return Left.create(comparePasswordOrError.left);

    if (!comparePasswordOrError.right)
      return Left.create(new AuthUserWhrogError());

    const jwt = await this.jwt.encrypt({
      id: emailsExistsOrError.right.user.id,
    });

    if (jwt.left) return Left.create(jwt.left);

    emailsExistsOrError.right.user.password = '';

    return Right.create({
      jwt: jwt.right,
      user: emailsExistsOrError.right.user,
    });
  }
}
