import { PrismaClient } from '@prisma/client';
import { ProductEntity, ProductInterface } from 'src/app/core/entities/product';
import { Either, Left, Right } from 'src/app/core/errors/either';
import { ErrorBase } from 'src/app/core/errors/errorBase';
import { ProductNotExistsError } from 'src/app/core/errors/product/notExists';
import { ProductRepositoryInterface } from 'src/app/data/interfaces/repository/product';
import { ServerError } from '../errors/server';

export class ProductRepositoryPrisma implements ProductRepositoryInterface {
  constructor(private prismaClient: PrismaClient) {}

  async findById(id: number): Promise<Either<ErrorBase, ProductEntity>> {
    try {
      const findProduct = await this.prismaClient.product.findFirst({
        where: {
          id: id,
        },
      });
      if (!findProduct) return Left.create(new ProductNotExistsError());

      const convertedToSend = new ProductEntity({
        ...findProduct,
      });

      return Right.create(convertedToSend);
    } catch (e) {
      return Left.create(new ServerError('Erro para pegar o produto com id!'));
    }
  }

  async findAllWithPagination(
    size: number,
    offset: number,
  ): Promise<Either<ErrorBase, ProductEntity[]>> {
    const offsetFinal = offset <= 0 ? 0 : offset - 1;

    try {
      const findProduct = await this.prismaClient.product.findMany({
        take: size,
        skip: offsetFinal,
      });
      if (!findProduct) return Left.create(new ProductNotExistsError());

      return Right.create(
        findProduct.map(
          (item) =>
            new ProductEntity({
              amount: item.amount,
              branch: item.branch,
              createdAt: item.createdAt,
              description: item.description,
              id: item.id,
              shelf: item.shelf,
              supervisor: item.supervisor,
              updatedAt: item.updatedAt,
            }),
        ),
      );
    } catch (e) {
      return Left.create(new ServerError('Erro para pegar os produtos!'));
    }
  }

  async findByAllInfos(
    product: Omit<ProductInterface, 'createdAt' | 'updatedAt' | 'id'>,
  ): Promise<Either<ErrorBase, ProductEntity>> {
    try {
      const findProduct = await this.prismaClient.product.findFirst({
        where: {
          ...product,
          amount: undefined,
        },
      });
      if (!findProduct) return Left.create(new ProductNotExistsError());
      return Right.create(
        new ProductEntity({
          ...findProduct,
        }),
      );
    } catch (e) {
      return Left.create(
        new ServerError('Erro para pegar o produto com todas as informações!'),
      );
    }
  }

  async update(
    product: Omit<
      ProductInterface,
      'id' | 'createdAt' | 'updatedAt' | 'amount'
    >,
    update: Omit<ProductInterface, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Either<ErrorBase, void>> {
    try {
      await this.prismaClient.product.updateMany({
        where: {
          ...product,
        },
        data: {
          ...update,
        },
      });
      return Right.create(undefined);
    } catch (e) {
      return Left.create(new ServerError('Erro para atualizar o produto'));
    }
  }

  async create(
    product: Omit<ProductInterface, 'createdAt' | 'updatedAt'>,
  ): Promise<Either<ErrorBase, ProductEntity>> {
    try {
      const create = await this.prismaClient.product.create({
        data: {
          ...product,
          id: undefined,
        },
      });

      const entity = new ProductEntity({
        amount: create.amount,
        branch: create.branch,
        createdAt: create.createdAt,
        description: create.description,
        id: create.id,
        shelf: create.shelf,
        supervisor: create.supervisor,
        updatedAt: create.updatedAt,
      });

      return Right.create(entity);
    } catch (e) {
      return Left.create(new ServerError('Erro para pegar os produtos!'));
    }
  }
}
