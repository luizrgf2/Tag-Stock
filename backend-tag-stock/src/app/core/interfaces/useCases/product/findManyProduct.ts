import { ProductInterface } from '../../../entities/product';
import { Either } from '../../../errors/either';
import { ErrorBase } from '../../../errors/errorBase';

export interface FindManyProductUseCaseOutput {
  products: ProductInterface[];
}

export interface FindManyProductUseCaseInterface {
  exec: () => Promise<Either<ErrorBase, FindManyProductUseCaseOutput>>;
}
