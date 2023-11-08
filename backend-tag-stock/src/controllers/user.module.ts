import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from '../services/prisma.service';
import { CreateUserService } from './user/create-user.service';
import { FindOneUserService } from './user/find-user-with-email-or-id.service';

@Module({
  controllers: [UserController],
  providers: [PrismaService, CreateUserService, FindOneUserService],
})
export class UserModule {}
