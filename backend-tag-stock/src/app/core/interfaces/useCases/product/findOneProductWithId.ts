import { ProductInterface } from '../../../entities/product';
import { Either } from '../../../errors/either';
import { ErrorBase } from '../../../errors/errorBase';

export interface FindOneProductWithIdUseCaseInput {
  idProduct: string;
}

export interface FindOneProductWithIdUseCaseOutput {
  product: ProductInterface;
}

export interface FindOneProductWithIdUseCaseInterface {
  exec: (
    input: FindOneProductWithIdUseCaseInput,
  ) => Promise<Either<ErrorBase, FindOneProductWithIdUseCaseOutput>>;
}
