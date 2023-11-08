import { Either, Left, Right } from 'src/app/core/errors/either';
import { ErrorBase } from 'src/app/core/errors/errorBase';
import {
  CreateProductUseCaseInput,
  CreateProductUseCaseInterface,
  CreateProductUseCaseOutput,
} from 'src/app/core/interfaces/useCases/product/createProduct';
import { ProductRepositoryInterface } from '../../interfaces/repository/product';
import { ProductEntity, ProductInterface } from 'src/app/core/entities/product';
import { ProductNotExistsError } from 'src/app/core/errors/product/notExists';
import { ProductAlreadyExistsError } from 'src/app/core/errors/product/alreayExists';

export class CreateProductUseCase implements CreateProductUseCaseInterface {
  constructor(private readonly productRepo: ProductRepositoryInterface) {}

  private createProductEntity(
    product: ProductInterface,
  ): Either<ErrorBase, ProductEntity> {
    const createProductEntityOrError =
      ProductEntity.createWithValidations(product);
    if (createProductEntityOrError.left)
      return Left.create(createProductEntityOrError.left);
    return Right.create(createProductEntityOrError.right);
  }

  private async checkIfProductExists(
    product: CreateProductUseCaseInput,
  ): Promise<Either<ErrorBase, void>> {
    const productOrError = await this.productRepo.findByAllInfos(product);
    if (
      productOrError.left &&
      !(productOrError.left instanceof ProductNotExistsError)
    )
      return Left.create(productOrError.left);
    if (productOrError.right)
      return Left.create(new ProductAlreadyExistsError());
    return Right.create(undefined);
  }

  private async saveProduct(
    product: ProductInterface,
  ): Promise<Either<ErrorBase, ProductEntity>> {
    const createProductOrError = await this.productRepo.create(product);
    if (createProductOrError.left)
      return Left.create(createProductOrError.left);
    return Right.create(createProductOrError.right);
  }

  async exec(
    input: CreateProductUseCaseInput,
  ): Promise<Either<ErrorBase, CreateProductUseCaseOutput>> {
    const createProductEntityOrError = this.createProductEntity({
      ...input,
      id: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    if (createProductEntityOrError.left)
      return Left.create(createProductEntityOrError.left);

    const productNotExistsError = await this.checkIfProductExists(input);
    if (productNotExistsError.left)
      return Left.create(productNotExistsError.left);

    const createProductOrError = await this.saveProduct(
      createProductEntityOrError.right.product,
    );
    if (createProductOrError.left)
      return Left.create(createProductOrError.left);

    return Right.create(createProductEntityOrError.right);
  }
}
