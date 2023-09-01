import { UserInterface } from '../../../entities/user';
import { Either } from '../../../errors/either';
import { ErrorBase } from '../../../errors/errorBase';

export interface AuthUserUseCaseInput {
  email: string;
  password: string;
}

export interface AuthUserUseCaseOutput {
  jwt: string;
  user: Omit<UserInterface, 'password'>;
}

export interface AuthUserUseCaseInterface {
  exec: (
    input: AuthUserUseCaseInput,
  ) => Promise<Either<ErrorBase, AuthUserUseCaseOutput>>;
}
