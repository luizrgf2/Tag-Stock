import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/services/prisma.service';
import { CreateUserFactory } from 'src/app/presentation/factory/createUser';
import { CreateUserUseCaseOutput } from 'src/app/core/interfaces/useCases/user/createUser';
import { FindOneUserCaseOutput } from 'src/app/core/interfaces/useCases/user/findOneUser';
import { FindUserFactory } from 'src/app/presentation/factory/findUser';

interface FindWithEmailOrIdProps {
  email?: string;
  id?: string;
}

@Controller('user')
export class CreateUserNestController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post('create')
  @HttpCode(201)
  async create(@Body() body: CreateUserDTO): Promise<CreateUserUseCaseOutput> {
    const useCase = CreateUserFactory.handle(this.prismaService);
    const response = await useCase.exec({
      body: {
        ...body,
      },
    });
    if (response.error)
      throw new HttpException(response.error, response.status);
    return { user: response.body.user };
  }

  @Get('find')
  async findWithEmailOrId(
    @Query() query: FindWithEmailOrIdProps,
  ): Promise<FindOneUserCaseOutput> {
    const useCase = FindUserFactory.handle(this.prismaService);
    const response = await useCase.exec({
      body: {
        ...query,
      },
    });

    if (response.error)
      throw new HttpException(response.error, response.status);

    return {
      user: response.body.user,
    };
  }
}
