import { Either, Left, Right } from '../errors/either';
import { ErrorBase } from '../errors/errorBase';
import { AmountError, AmountMessage } from '../errors/product/amount';
import {
  DescriptionError,
  DescriptionMessage,
} from '../errors/product/description';

export interface ProductInterface {
  id: string;
  branch: number;
  description: string;
  shelf: string;
  supervisor: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ProductEntity {
  product: ProductInterface;

  constructor(product: ProductInterface) {
    this.product = product;
  }
  static isValidAmount(amount: number): boolean {
    if (amount < 0) return false;
    return true;
  }

  static isValidDescription(description: string): boolean {
    if (description.length === 0 || description.length > 100) return false;
    return true;
  }

  static createWithValidations(
    product: Omit<ProductInterface, 'id' | 'createdAt' | 'updatedAt'>,
  ): Either<ErrorBase, ProductEntity> {
    const productData = new ProductEntity({
      ...product,
      id: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const isValidAmount = this.isValidAmount(productData.product.amount);
    const isValidDescription = this.isValidDescription(
      productData.product.description,
    );

    if (!isValidAmount)
      return Left.create<AmountError>(new AmountError(AmountMessage.invalid));
    if (!isValidDescription)
      return Left.create<DescriptionError>(
        new DescriptionError(DescriptionMessage.lenght),
      );

    return Right.create(productData);
  }
}
