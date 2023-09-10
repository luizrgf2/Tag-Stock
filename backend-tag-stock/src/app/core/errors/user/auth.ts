import { ErrorBase } from '../errorBase';

export enum EmailMessage {
  invalid = 'O email é inválido!',
  wrong = 'Senha ou email errado!',
}

export class AuthError extends ErrorBase {
  constructor(message: EmailMessage) {
    super(message, 401);
  }
}
