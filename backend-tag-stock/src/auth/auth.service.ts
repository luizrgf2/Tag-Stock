import { Injectable } from '@nestjs/common';
import { Either, Left, Right } from 'src/app/core/errors/either';
import { ErrorBase } from 'src/app/core/errors/errorBase';
import { AuthUserFactory } from 'src/app/presentation/factory/authUser';
import { PrismaService } from 'src/services/prisma.service';

interface SignInOutput {
  token_jwt: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<Either<ErrorBase, SignInOutput>> {
    const JWT_PRIVATE_KEY = process.env.JWT_KEY;
    const useCase = AuthUserFactory.handle(this.prismaService, JWT_PRIVATE_KEY);
    const response = await useCase.exec({
      body: { email: email, password: pass },
    });
    if (response.error)
      return Left.create(new ErrorBase(response.error, response.status));
    return Right.create({
      token_jwt: response.body.jwt,
    });
  }
}
