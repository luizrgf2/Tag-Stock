import { ControllerInterface } from '../interfaces/controller';
import { HTTPRequest, HTTPResponse } from '../interfaces/http';
import {
  AuthUserUseCaseInput,
  AuthUserUseCaseInterface,
  AuthUserUseCaseOutput,
} from 'src/app/core/interfaces/useCases/user/authUser';

export class AuthUserController implements ControllerInterface {
  constructor(private readonly usecase: AuthUserUseCaseInterface) {}

  async exec(
    req: HTTPRequest<AuthUserUseCaseInput>,
  ): Promise<HTTPResponse<AuthUserUseCaseOutput>> {
    const body = req.body;

    const res = await this.usecase.exec({
      ...body,
    });

    if (res.left)
      return {
        status: res.left.code,
        error: res.left.message,
      };

    return {
      status: 200,
      body: {
        ...res.right,
      },
    };
  }
}
