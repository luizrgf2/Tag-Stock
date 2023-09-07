import { Either } from 'src/app/core/errors/either';
import { ErrorBase } from 'src/app/core/errors/errorBase';

export interface EncryptorInterface {
  encrypt: (data: string) => Promise<Either<ErrorBase, string>>;
  compare: (
    dataEncrypted: string,
    data: string,
  ) => Promise<Either<ErrorBase, boolean>>;
}
