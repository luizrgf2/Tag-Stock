import { ErrorBase } from 'src/app/core/errors/errorBase';

export enum ServerErrorMessage {
  passwordEncrypt = 'Erro para encriptar a senha',
  passwordDecrypt = 'Erro para comparar as senhas',
  jwt = 'Erro para gerar o jwt',
  createUser = 'Erro para criar o usuário!',
  findUserById = 'Erro para pegar o usuário com id',
  findUserByEmail = 'Erro para pegar o usuário com email',
}

export class ServerError extends ErrorBase {
  constructor(message: ServerErrorMessage) {
    super(message, 500);
  }
}
