import { Injectable } from '@nestjs/common';
import { UserPrismaRepository } from 'src/app/infra/repository/userPrisma';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService extends UserPrismaRepository {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService);
  }
}
