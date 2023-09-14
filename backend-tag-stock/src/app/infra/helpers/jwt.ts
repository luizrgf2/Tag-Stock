import { Either, Left, Right } from 'src/app/core/errors/either';
import { ErrorBase } from 'src/app/core/errors/errorBase';
import { JsonWebTokenInterface } from 'src/app/data/interfaces/utils/jwt';
import jwt from 'jsonwebtoken';
import { ServerError, ServerErrorMessage } from '../errors/server';
import { JWTError, JWTErrorMessage } from '../errors/jwt';

export class JWTImp implements JsonWebTokenInterface {
  constructor(private readonly jwtPrivateKey: string) {}

  async encrypt<T = any>(data: T): Promise<Either<ErrorBase, string>> {
    try {
      const encryptData = jwt.sign(data as object, this.jwtPrivateKey);
      return Right.create(encryptData);
    } catch (e) {
      return Left.create(new ServerError(ServerErrorMessage.jwt));
    }
  }

  async decrypt<T = any>(token: string): Promise<Either<ErrorBase, T>> {
    try {
      const decryptData = jwt.verify(token, this.jwtPrivateKey) as T;
      return Right.create(decryptData);
    } catch (e) {
      return Left.create(new JWTError(JWTErrorMessage.invalidToken));
    }
  }
}
