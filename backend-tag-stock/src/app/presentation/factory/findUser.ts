import { PrismaClient } from '@prisma/client';
import { FindOneUserUseCase } from 'src/app/data/useCases/user/findOneUser';
import { UserPrismaRepository } from 'src/app/infra/repository/userPrisma';
import { FindUserController } from '../controllers/findUser';

export class FindUserFactory {
  static handle(prismaClient: PrismaClient) {
    const repository = new UserPrismaRepository(prismaClient);
    const useCase = new FindOneUserUseCase(repository);
    const controller = new FindUserController(useCase);
    return controller;
  }

  static handleOnlyUseCase(prismaClient: PrismaClient) {
    const repository = new UserPrismaRepository(prismaClient);
    const useCase = new FindOneUserUseCase(repository);
    return useCase;
  }
}
