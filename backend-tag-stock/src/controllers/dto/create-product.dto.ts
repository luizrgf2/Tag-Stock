import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateProductDTO {
  @IsNumber()
  @IsNotEmpty()
  branch: number;
  @IsString()
  description: string;
  @IsString()
  shelf: string;
  @IsNumber()
  supervisor: number;
  @IsNumber()
  amount: number;
}
