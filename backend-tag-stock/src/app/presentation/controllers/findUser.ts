import {
  FindOneUserCaseInput,
  FindOneUserCaseOutput,
} from 'src/app/core/interfaces/useCases/user/findOneUser';
import { ControllerInterface } from '../interfaces/controller';
import { HTTPRequest, HTTPResponse } from '../interfaces/http';
import { FindOneUserCaseInterface } from 'src/app/core/interfaces/useCases/user/findOneUser';

export class FindUserController implements ControllerInterface {
  constructor(private readonly usecase: FindOneUserCaseInterface) {}

  async exec(
    req: HTTPRequest<FindOneUserCaseInput>,
  ): Promise<HTTPResponse<FindOneUserCaseOutput>> {
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
