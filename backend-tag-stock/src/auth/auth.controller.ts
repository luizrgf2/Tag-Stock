import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() { email, pass }: AuthDTO) {
    const signInOrError = await this.authService.signIn(email, pass);
    if (signInOrError.left)
      throw new HttpException(
        signInOrError.left.message,
        signInOrError.left.code,
      );
    return {
      token: signInOrError.right.token_jwt,
    };
  }
}
