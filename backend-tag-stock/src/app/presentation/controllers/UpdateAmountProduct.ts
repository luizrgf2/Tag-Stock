import { ControllerInterface } from '../interfaces/controller';
import { HTTPRequest, HTTPResponse } from '../interfaces/http';
import {
  UpdateAmountOfProductUseCaseInput,
  UpdateAmountOfProductUseCaseInterface,
} from 'src/app/core/interfaces/useCases/product/updateAmountOfProduct';

export class UpdateAmountOfProductsController implements ControllerInterface {
  constructor(
    private readonly usecase: UpdateAmountOfProductUseCaseInterface,
  ) {}

  async exec(
    req: HTTPRequest<UpdateAmountOfProductUseCaseInput>,
  ): Promise<HTTPResponse<void>> {
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
      body: undefined,
    };
  }
}
