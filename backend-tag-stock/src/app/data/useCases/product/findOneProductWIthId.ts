import { Either, Left, Right } from 'src/app/core/errors/either';
import { ErrorBase } from 'src/app/core/errors/errorBase';
import {
  FindOneProductWithIdUseCaseInput,
  FindOneProductWithIdUseCaseInterface,
  FindOneProductWithIdUseCaseOutput,
} from 'src/app/core/interfaces/useCases/product/findOneProductWithId';
import { ProductRepositoryInterface } from '../../interfaces/repository/product';

export class FindOneProductWithIdUseCase
  implements FindOneProductWithIdUseCaseInterface
{
  constructor(private readonly productRepo: ProductRepositoryInterface) {}

  async exec(
    input: FindOneProductWithIdUseCaseInput,
  ): Promise<Either<ErrorBase, FindOneProductWithIdUseCaseOutput>> {
    const { idProduct } = input;

    const productOrError = await this.productRepo.findById(idProduct);
    if (productOrError.left) return Left.create(productOrError.left);

    return Right.create(productOrError.right);
  }
}
