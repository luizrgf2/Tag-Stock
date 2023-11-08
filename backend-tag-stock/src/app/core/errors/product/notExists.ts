import { ErrorBase } from '../errorBase';

export class ProductNotExistsError extends ErrorBase {
  constructor() {
    super('O produto não existe!', 404);
  }
}
