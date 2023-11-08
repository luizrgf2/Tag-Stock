import { Global, Module } from '@nestjs/common';
import { JWTProvider, JWTService } from './jwt.service';

@Global()
@Module({
  providers: [JWTProvider],
  exports: [JWTService],
})
export class JWTModule {}
