import { ErrorBase } from '../errorBase';

export enum NameMessage {
  invalid = 'O nome é inválido, não deve conter números, não pode estar vazio e deve ser menos que 30 caracteres!',
}

export class NameError extends ErrorBase {
  constructor(message: NameMessage) {
    super(message, 400);
  }
}
