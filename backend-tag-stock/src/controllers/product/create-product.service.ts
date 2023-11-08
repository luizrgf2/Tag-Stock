import { Injectable } from '@nestjs/common';
import { Either, Left, Right } from 'src/app/core/errors/either';
import { ErrorBase } from 'src/app/core/errors/errorBase';
import {
  CreateProductUseCaseInput,
  CreateProductUseCaseOutput,
} from 'src/app/core/interfaces/useCases/product/createProduct';
import { CreateProductFactory } from 'src/app/presentation/factory/createProduct';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class CreateProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async exec(
    input: CreateProductUseCaseInput,
  ): Promise<Either<ErrorBase, CreateProductUseCaseOutput>> {
    const createProduct = CreateProductFactory.handle(this.prismaService);
    const res = await createProduct.exec({
      body: input,
    });

    if (res.error) {
      return Left.create(new ErrorBase(res.error, res.status));
    }
    return Right.create(res.body);
  }
}
