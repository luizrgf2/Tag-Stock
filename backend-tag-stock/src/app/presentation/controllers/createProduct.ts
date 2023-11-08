import {
  CreateProductUseCaseInput,
  CreateProductUseCaseInterface,
  CreateProductUseCaseOutput,
} from 'src/app/core/interfaces/useCases/product/createProduct';
import { ControllerInterface } from '../interfaces/controller';
import { HTTPRequest, HTTPResponse } from '../interfaces/http';

export class CreateProductController implements ControllerInterface {
  constructor(private readonly usecase: CreateProductUseCaseInterface) {}

  async exec(
    req: HTTPRequest<CreateProductUseCaseInput>,
  ): Promise<HTTPResponse<CreateProductUseCaseOutput>> {
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
