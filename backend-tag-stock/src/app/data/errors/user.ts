import { ErrorBase } from 'src/app/core/errors/errorBase';

export class UserNotExistsError extends ErrorBase {
  constructor() {
    super('O usuário não existe!', 404);
  }
}

export class AuthUserWhrogError extends ErrorBase {
  constructor() {
    super('O email ou a senha esta errado!', 401);
  }
}

export class UserAlreadyExists extends ErrorBase {
  constructor() {
    super('O email já existe, tente com outro!', 400);
  }
}
