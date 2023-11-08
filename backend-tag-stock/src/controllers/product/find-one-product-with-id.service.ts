import { Injectable } from '@nestjs/common';
import { Either, Left, Right } from 'src/app/core/errors/either';
import { ErrorBase } from 'src/app/core/errors/errorBase';
import {
  FindOneProductWithIdUseCaseInput,
  FindOneProductWithIdUseCaseOutput,
} from 'src/app/core/interfaces/useCases/product/findOneProductWithId';
import { FindOneProductWithIdFactory } from 'src/app/presentation/factory/findOneProductWithId';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class FindOneProductWithIdService {
  constructor(private readonly prismaService: PrismaService) {}

  async exec(
    input: FindOneProductWithIdUseCaseInput,
  ): Promise<Either<ErrorBase, FindOneProductWithIdUseCaseOutput>> {
    const FindOneProductWithId = FindOneProductWithIdFactory.handle(
      this.prismaService,
    );
    const res = await FindOneProductWithId.exec({
      body: input,
    });

    if (res.error) {
      return Left.create(new ErrorBase(res.error, res.status));
    }
    return Right.create(res.body);
  }
}
