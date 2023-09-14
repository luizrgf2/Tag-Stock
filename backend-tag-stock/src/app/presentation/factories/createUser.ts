import { PrismaClient } from '@prisma/client';
import { CreateUserUseCase } from 'src/app/data/useCases/user/createUser';
import { UserPrismaRepository } from 'src/app/infra/repository/userPrisma';

export class CreateUserFactory {
  static handle(prismaClient: PrismaClient) {
    const service1 = new UserPrismaRepository()
    const usecase = new CreateUserUseCase();
  }
}
