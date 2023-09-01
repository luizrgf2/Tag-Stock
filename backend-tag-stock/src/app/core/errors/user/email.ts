import { ErrorBase } from '../errorBase';

export enum EmailMessage {
  invalid = 'O email é inválido!',
}

export class EmailError extends ErrorBase {
  constructor(message: EmailMessage) {
    super(message, 400);
  }
}
