import { Injectable } from '@nestjs/common';
import { BcryptImp } from '../../app/infra/helpers/encryptor';

@Injectable()
export class EncryptorService extends BcryptImp {}
