import { Either } from '../../../errors/either';
import { ErrorBase } from '../../../errors/errorBase';

export interface UpdateAmountOfProductUseCaseInput {
  idProduct: string;
  amountOfProductToSubstract: number;
}

export interface UpdateAmountOfProductUseCaseInterface {
  exec: (
    input: UpdateAmountOfProductUseCaseInput,
  ) => Promise<Either<ErrorBase, void>>;
}
