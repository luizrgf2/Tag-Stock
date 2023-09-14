import { Either, Left, Right } from 'src/app/core/errors/either';
import { ErrorBase } from 'src/app/core/errors/errorBase';
import { EncryptorInterface } from 'src/app/data/interfaces/utils/encrypt';
import bcrypt from 'bcrypt';
import { ServerError, ServerErrorMessage } from '../errors/server';

export class BcryptImp implements EncryptorInterface {
  async encrypt(data: string): Promise<Either<ErrorBase, string>> {
    try {
      const encryptOrError = bcrypt.hashSync(data, 10);
      return Right.create(encryptOrError);
    } catch {
      return Left.create(new ServerError(ServerErrorMessage.passwordEncrypt));
    }
  }

  async compare(
    dataEncrypted: string,
    data: string,
  ): Promise<Either<ErrorBase, boolean>> {
    try {
      const decryptedDataOrError = bcrypt.compareSync(data, dataEncrypted);
      return Right.create(decryptedDataOrError);
    } catch {
      return Left.create(new ServerError(ServerErrorMessage.passwordDecrypt));
    }
  }
}
