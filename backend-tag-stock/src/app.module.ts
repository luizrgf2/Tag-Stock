import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './controllers/user.module';
import { JWTModule } from './services/helpers/jwt.module';
import { ProductModule } from './controllers/product.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    UserModule,
    JWTModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
