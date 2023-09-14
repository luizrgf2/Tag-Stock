import {
  CreateUserUseCaseInput,
  CreateUserUseCaseInterface,
  CreateUserUseCaseOutput,
} from 'src/app/core/interfaces/useCases/user/createUser';
import { ControllerInterface } from '../interfaces/controller';
import { HTTPRequest, HTTPResponse } from '../interfaces/http';

export class CreateUserController implements ControllerInterface {
  constructor(private readonly usecase: CreateUserUseCaseInterface) {}

  async exec(
    req: HTTPRequest<CreateUserUseCaseInput>,
  ): Promise<HTTPResponse<CreateUserUseCaseOutput>> {
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
      status: 201,
      body: {
        ...res.right,
      },
    };
  }
}
