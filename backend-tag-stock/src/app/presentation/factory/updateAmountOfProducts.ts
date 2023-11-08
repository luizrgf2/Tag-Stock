import { PrismaClient } from '@prisma/client';
import { UpdateAmountProductUseCase } from 'src/app/data/useCases/product/updateAmountOfProduct';
import { ProductRepositoryPrisma } from 'src/app/infra/repository/productPrisma';
import { UpdateAmountOfProductsController } from '../controllers/UpdateAmountProduct';

export class UpdateAmountOfProductsFactory {
  static handle(prismaClient: PrismaClient) {
    const repository = new ProductRepositoryPrisma(prismaClient);
    const useCase = new UpdateAmountProductUseCase(repository);
    const controller = new UpdateAmountOfProductsController(useCase);
    return controller;
  }

  static handleOnlyUseCase(prismaClient: PrismaClient) {
    const repository = new ProductRepositoryPrisma(prismaClient);
    const useCase = new UpdateAmountProductUseCase(repository);
    return useCase;
  }
}
