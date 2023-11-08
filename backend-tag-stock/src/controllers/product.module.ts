import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { CreateProductService } from './product/create-product.service';
import { PrismaService } from 'src/services/prisma.service';
import { UpdateAmountOfProductsService } from './product/update-amount-of-products.service';
import { FindOneProductWithIdService } from './product/find-one-product-with-id.service';

@Module({
  controllers: [ProductController],
  providers: [
    CreateProductService,
    PrismaService,
    UpdateAmountOfProductsService,
    FindOneProductWithIdService,
  ],
})
export class ProductModule {}
