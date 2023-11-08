import { PrismaClient } from '@prisma/client';
import { ProductRepositoryPrisma } from 'src/app/infra/repository/productPrisma';
import { FindOneProductWithIdController } from '../controllers/findOneProductWithId';
import { FindOneProductWithIdUseCase } from 'src/app/data/useCases/product/findOneProductWIthId';

export class FindOneProductWithIdFactory {
  static handle(prismaClient: PrismaClient) {
    const repository = new ProductRepositoryPrisma(prismaClient);
    const useCase = new FindOneProductWithIdUseCase(repository);
    const controller = new FindOneProductWithIdController(useCase);
    return controller;
  }

  static handleOnlyUseCase(prismaClient: PrismaClient) {
    const repository = new ProductRepositoryPrisma(prismaClient);
    const useCase = new FindOneProductWithIdUseCase(repository);
    return useCase;
  }
}
