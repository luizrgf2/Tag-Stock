import { UserInterface } from '../../../entities/user';
import { Either } from '../../../errors/either';
import { ErrorBase } from '../../../errors/errorBase';

export interface FindOneUserCaseInput {
  email?: string;
  id?: string;
}

export interface FindOneUserCaseOutput {
  user: Omit<UserInterface, 'password'>;
}

export interface FindOneUserCaseInterface {
  exec: (
    input: FindOneUserCaseInput,
  ) => Promise<Either<ErrorBase, FindOneUserCaseOutput>>;
}
