import { Injectable } from '@nestjs/common';
import { Either, Left, Right } from 'src/app/core/errors/either';
import { ErrorBase } from 'src/app/core/errors/errorBase';
import { UpdateAmountOfProductUseCaseInput } from 'src/app/core/interfaces/useCases/product/updateAmountOfProduct';
import { UpdateAmountOfProductsFactory } from 'src/app/presentation/factory/updateAmountOfProducts';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class UpdateAmountOfProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async exec(
    input: UpdateAmountOfProductUseCaseInput,
  ): Promise<Either<ErrorBase, void>> {
    const updateAmountOfProducts = UpdateAmountOfProductsFactory.handle(
      this.prismaService,
    );
    const res = await updateAmountOfProducts.exec({
      body: input,
    });

    if (res.error) {
      return Left.create(new ErrorBase(res.error, res.status));
    }
    return Right.create(res.body);
  }
}
