import { ProductInterface } from '../../../entities/product';
import { Either } from '../../../errors/either';
import { ErrorBase } from '../../../errors/errorBase';

export interface CreateProductUseCaseInput
  extends Omit<ProductInterface, 'createdAt' | 'updatedAt'> {}

export interface CreateProductUseCaseOutput {
  product: ProductInterface;
}

export interface CreateProductUseCaseInterface {
  exec: (
    input: CreateProductUseCaseInput,
  ) => Promise<Either<ErrorBase, CreateProductUseCaseOutput>>;
}
