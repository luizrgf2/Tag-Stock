import { Injectable } from '@nestjs/common';
import { JWTImp } from 'src/app/infra/helpers/jwt';

@Injectable()
export class JWTService extends JWTImp {}
