import { ErrorBase } from '../errorBase';

export class ProductAlreadyExistsError extends ErrorBase {
  constructor() {
    super('O produto já existe!', 400);
  }
}
