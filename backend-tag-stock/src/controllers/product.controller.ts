import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { CreateProductUseCaseOutput } from 'src/app/core/interfaces/useCases/product/createProduct';
import { CreateProductService } from './product/create-product.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FindOneProductWithIdUseCaseOutput } from 'src/app/core/interfaces/useCases/product/findOneProductWithId';
import { FindOneProductWithIdService } from './product/find-one-product-with-id.service';
import { UpdateAmountOfProductDTO } from './dto/update-amount-of-products.dto';
import { UpdateAmountOfProductsService } from './product/update-amount-of-products.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly findOneProductWithIdService: FindOneProductWithIdService,
    private readonly updateAmountOfProductsService: UpdateAmountOfProductsService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(
    @Body() body: CreateProductDTO,
  ): Promise<CreateProductUseCaseOutput> {
    const res = await this.createProductService.exec({
      ...body,
    });

    if (res.left) {
      throw new HttpException(res.left.message, res.left.code);
    }

    return res.right;
  }

  @UseGuards(AuthGuard)
  @Post('updateamount')
  async updateAmount(@Body() body: UpdateAmountOfProductDTO): Promise<void> {
    const res = await this.updateAmountOfProductsService.exec({
      amountOfProductToSubstract: body.amountToSubstract,
      product: {
        branch: body.branch,
        description: body.description,
        shelf: body.shelf,
        supervisor: body.supervisor,
      },
    });

    if (res.left) {
      throw new HttpException(res.left.message, res.left.code);
    }

    return res.right;
  }

  @UseGuards(AuthGuard)
  @Get('find/:id')
  async FindOneById(
    @Param('id') id: number,
  ): Promise<FindOneProductWithIdUseCaseOutput> {
    const res = await this.findOneProductWithIdService.exec({
      idProduct: Number(id),
    });

    if (res.left) {
      throw new HttpException(res.left.message, res.left.code);
    }

    return res.right;
  }
}
