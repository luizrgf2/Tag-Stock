import { ErrorBase } from '../errorBase';

export enum PasswordMessage {
  invalid = 'A senha deve ter de 8 a 15 caracteres e pelo menos uma letra maiúscula!',
}

export class PasswordError extends ErrorBase {
  constructor(message: PasswordMessage) {
    super(message, 400);
  }
}
