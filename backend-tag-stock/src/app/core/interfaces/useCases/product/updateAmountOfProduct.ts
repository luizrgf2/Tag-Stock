import { ProductInterface } from 'src/app/core/entities/product';
import { Either } from '../../../errors/either';
import { ErrorBase } from '../../../errors/errorBase';

export interface UpdateAmountOfProductUseCaseInput {
  product: Partial<
    Omit<ProductInterface, 'id' | 'createdAt' | 'updatedAt' | 'amount'>
  >;
  amountOfProductToSubstract: number;
}

export interface UpdateAmountOfProductUseCaseInterface {
  exec: (
    input: UpdateAmountOfProductUseCaseInput,
  ) => Promise<Either<ErrorBase, void>>;
}
