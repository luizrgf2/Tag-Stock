import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JWTService } from 'src/services/helpers/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JWTService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const jwtVerify = await this.jwtService.decrypt(token);
    if (jwtVerify.left) throw new UnauthorizedException();
    request['id'] = jwtVerify.right.id;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
