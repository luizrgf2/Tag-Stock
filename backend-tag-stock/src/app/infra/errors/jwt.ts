import { ErrorBase } from 'src/app/core/errors/errorBase';

export enum JWTErrorMessage {
  invalidToken = 'O token não pode ser validado',
}

export class JWTError extends ErrorBase {
  constructor(message: JWTErrorMessage) {
    super(message, 401);
  }
}
