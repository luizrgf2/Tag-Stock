import { Injectable } from '@nestjs/common';
import { UserPrismaRepository } from 'src/app/infra/repository/userPrisma';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserRepositoryService extends UserPrismaRepository {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService);
  }
}
