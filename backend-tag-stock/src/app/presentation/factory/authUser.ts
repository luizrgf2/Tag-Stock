import { PrismaClient } from '@prisma/client';
import { AuthUserUseCase } from 'src/app/data/useCases/user/authUser';
import { BcryptImp } from 'src/app/infra/helpers/encryptor';
import { JWTImp } from 'src/app/infra/helpers/jwt';
import { UserPrismaRepository } from 'src/app/infra/repository/userPrisma';
import { AuthUserController } from '../controllers/authUser';

export class AuthUserFactory {
  static handle(prismaClient: PrismaClient, jwtPrivateKey: string) {
    const repository = new UserPrismaRepository(prismaClient);
    const service1 = new BcryptImp();
    const service2 = new JWTImp(jwtPrivateKey);
    const usecase = new AuthUserUseCase(repository, service1, service2);
    const controller = new AuthUserController(usecase);
    return controller;
  }
}
