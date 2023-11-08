import { Injectable } from '@nestjs/common';
import { JWTImp } from '../../app/infra/helpers/jwt';
import { Provider } from '@nestjs/common';

@Injectable()
export class JWTService extends JWTImp {}

export const JWTProvider: Provider = {
  provide: JWTService,
  useFactory: () => {
    return new JWTService(process.env.JWT_KEY);
  },
};
