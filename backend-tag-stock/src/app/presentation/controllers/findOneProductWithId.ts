import {
  FindOneProductWithIdUseCaseInput,
  FindOneProductWithIdUseCaseInterface,
  FindOneProductWithIdUseCaseOutput,
} from 'src/app/core/interfaces/useCases/product/findOneProductWithId';
import { ControllerInterface } from '../interfaces/controller';
import { HTTPRequest, HTTPResponse } from '../interfaces/http';

export class FindOneProductWithIdController implements ControllerInterface {
  constructor(private readonly usecase: FindOneProductWithIdUseCaseInterface) {}

  async exec(
    req: HTTPRequest<FindOneProductWithIdUseCaseInput>,
  ): Promise<HTTPResponse<FindOneProductWithIdUseCaseOutput>> {
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
        product: {
          ...res.right.product,
        },
      },
    };
  }
}
