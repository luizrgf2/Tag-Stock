import { PrismaClient } from '@prisma/client';
import { CreateUserUseCase } from 'src/app/data/useCases/user/createUser';
import { BcryptImp } from 'src/app/infra/helpers/encryptor';
import { UserPrismaRepository } from 'src/app/infra/repository/userPrisma';
import { CreateUserController } from '../controllers/createUser';

export class CreateUserFactory {
  static handle(prismaClient: PrismaClient) {
    const repository = new UserPrismaRepository(prismaClient);
    const service1 = new BcryptImp();
    const useCase = new CreateUserUseCase(repository, service1);
    const controller = new CreateUserController(useCase);
    return controller;
  }

  static handleOnlyUseCase(prismaClient: PrismaClient) {
    const repository = new UserPrismaRepository(prismaClient);
    const service1 = new BcryptImp();
    const useCase = new CreateUserUseCase(repository, service1);
    return useCase;
  }
}
