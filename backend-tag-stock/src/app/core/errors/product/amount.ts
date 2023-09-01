import { ErrorBase } from '../errorBase';

export enum AmountMessage {
  invalid = 'A quantidade de produtos não pode estar abaixo de 0!',
}

export class AmountError extends ErrorBase {
  constructor(message: AmountMessage) {
    super(message, 400);
  }
}
