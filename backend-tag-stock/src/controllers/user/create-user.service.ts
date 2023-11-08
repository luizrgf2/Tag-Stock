import { Injectable } from '@nestjs/common';
import { CreateUserFactory } from '../../app/presentation/factory/createUser';
import { PrismaService } from '../../services/prisma.service';
import { CreateUserDTO } from '../dto/create-user.dto';
import { ErrorBase } from '../../app/core/errors/errorBase';
import { CreateUserUseCaseOutput } from '../../app/core/interfaces/useCases/user/createUser';
import { Either, Left, Right } from '../../app/core/errors/either';

@Injectable()
export class CreateUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async exec(
    input: CreateUserDTO,
  ): Promise<Either<ErrorBase, CreateUserUseCaseOutput>> {
    const useCase = CreateUserFactory.handle(this.prismaService);
    const response = await useCase.exec({
      body: {
        ...input,
      },
    });
    if (response.error)
      return Left.create(new ErrorBase(response.error, response.status));
    return Right.create(response.body);
  }
}
