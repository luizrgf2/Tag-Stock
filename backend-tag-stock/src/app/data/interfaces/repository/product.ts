import { ProductEntity, ProductInterface } from 'src/app/core/entities/product';
import { Either } from 'src/app/core/errors/either';
import { ErrorBase } from 'src/app/core/errors/errorBase';

export interface ProductRepositoryInterface {
  update: (
    product: Partial<
      Omit<ProductInterface, 'id' | 'createdAt' | 'updatedAt' | 'amount'>
    >,
    update: Partial<Omit<ProductInterface, 'id' | 'createdAt' | 'updatedAt'>>,
  ) => Promise<Either<ErrorBase, void>>;
  findByAllInfos: (
    product: Omit<ProductInterface, 'id' | 'createdAt' | 'updatedAt'>,
  ) => Promise<Either<ErrorBase, ProductEntity>>;
  findById: (id: number) => Promise<Either<ErrorBase, ProductEntity>>;
  findAllWithPagination: (
    size: number,
    offset: number,
  ) => Promise<Either<ErrorBase, ProductEntity[]>>;
  create: (
    product: Omit<ProductInterface, 'createdAt' | 'updatedAt'>,
  ) => Promise<Either<ErrorBase, ProductEntity>>;
}
