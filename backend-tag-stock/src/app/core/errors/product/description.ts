import { ErrorBase } from '../errorBase';

export enum DescriptionMessage {
  lenght = 'A descrição do produto deve ter de 1 a 100 caracteres!',
}

export class DescriptionError extends ErrorBase {
  constructor(message: DescriptionMessage) {
    super(message, 400);
  }
}
