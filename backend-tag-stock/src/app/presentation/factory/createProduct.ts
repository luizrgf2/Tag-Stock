import { CreateProductUseCase } from 'src/app/data/useCases/product/createProduct';
import { ProductRepositoryPrisma } from 'src/app/infra/repository/productPrisma';
import { CreateProductController } from '../controllers/createProduct';
import { PrismaClient } from '@prisma/client';

export class CreateProductFactory {
  static handle(prismaClient: PrismaClient) {
    const repository = new ProductRepositoryPrisma(prismaClient);
    const useCase = new CreateProductUseCase(repository);
    const controller = new CreateProductController(useCase);
    return controller;
  }

  static handleOnlyUseCase(prismaClient: PrismaClient) {
    const repository = new ProductRepositoryPrisma(prismaClient);
    const useCase = new CreateProductUseCase(repository);
    return useCase;
  }
}
