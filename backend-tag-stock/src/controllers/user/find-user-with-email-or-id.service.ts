import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { ErrorBase } from '../../app/core/errors/errorBase';
import { Either, Left, Right } from '../../app/core/errors/either';
import { FindUserDTO } from '../dto/find-user.dto';
import { FindUserFactory } from '../../app/presentation/factory/findUser';
import { FindOneUserCaseOutput } from '../../app/core/interfaces/useCases/user/findOneUser';

@Injectable()
export class FindOneUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async exec(
    input: FindUserDTO,
  ): Promise<Either<ErrorBase, FindOneUserCaseOutput>> {
    const useCase = FindUserFactory.handle(this.prismaService);
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
