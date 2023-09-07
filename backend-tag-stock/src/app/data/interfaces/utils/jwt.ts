import { Either } from 'src/app/core/errors/either';
import { ErrorBase } from 'src/app/core/errors/errorBase';

export interface JsonWebTokenInterface {
  encrypt: <T = any>(data: T) => Promise<Either<ErrorBase, string>>;
  decrypt: <T = any>(token: string) => Promise<Either<ErrorBase, T>>;
}
