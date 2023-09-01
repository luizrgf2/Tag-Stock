import { UserInterface } from '../../../entities/user';
import { Either } from '../../../errors/either';
import { ErrorBase } from '../../../errors/errorBase';

export interface CreateUserUseCaseInput {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserUseCaseOutput {
  user: Omit<UserInterface, 'password'>;
}

export interface CreateUserUseCaseInterface {
  exec: (
    input: CreateUserUseCaseInput,
  ) => Promise<Either<ErrorBase, CreateUserUseCaseOutput>>;
}
