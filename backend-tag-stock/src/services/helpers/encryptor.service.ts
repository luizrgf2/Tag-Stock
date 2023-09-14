import { Injectable } from '@nestjs/common';
import { BcryptImp } from 'src/app/infra/helpers/encryptor';

@Injectable()
export class EncryptorService extends BcryptImp {}
