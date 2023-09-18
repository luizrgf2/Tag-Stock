import { Module } from '@nestjs/common';
import { CreateUserNestController } from 'src/controllers/user.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [CreateUserNestController],
  providers: [PrismaService],
})
export class CreateUserModule {}
