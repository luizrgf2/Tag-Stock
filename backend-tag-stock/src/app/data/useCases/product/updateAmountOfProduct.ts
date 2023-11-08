import { Either, Left, Right } from 'src/app/core/errors/either';
import { ErrorBase } from 'src/app/core/errors/errorBase';
import {
  UpdateAmountOfProductUseCaseInput,
  UpdateAmountOfProductUseCaseInterface,
} from 'src/app/core/interfaces/useCases/product/updateAmountOfProduct';
import { ProductRepositoryInterface } from '../../interfaces/repository/product';

export class UpdateAmountProductUseCase
  implements UpdateAmountOfProductUseCaseInterface
{
  constructor(private readonly productRepo: ProductRepositoryInterface) {}

  async exec(
    input: UpdateAmountOfProductUseCaseInput,
  ): Promise<Either<ErrorBase, void>> {
    const { amountOfProductToSubstract, product } = input;

    const productExistsOrError = await this.productRepo.findByAllInfos({
      amount: 0,
      branch: product.branch || 0,
      description: product.description || '',
      shelf: product.shelf || '',
      supervisor: product.supervisor || 0,
    });
    if (productExistsOrError.left)
      return Left.create(productExistsOrError.left);

    if (
      productExistsOrError.right.product.amount < amountOfProductToSubstract
    ) {
      return Left.create(
        new ErrorBase(
          `Não tem estoque o suficiente para ${product.description}`,
          400,
        ),
      );
    }

    const productUpdateOrError = await this.productRepo.update(product, {
      amount:
        productExistsOrError.right.product.amount - amountOfProductToSubstract,
    });
    if (productUpdateOrError.left)
      return Left.create(productUpdateOrError.left);
    return Right.create(undefined);
  }
}
