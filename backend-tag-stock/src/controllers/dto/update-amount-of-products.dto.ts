import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class UpdateAmountOfProductDTO {
  @IsNumber()
  @IsNotEmpty()
  branch: number;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  shelf: string;
  @IsNotEmpty()
  @IsNumber()
  supervisor: number;
  @IsNumber()
  @IsNotEmpty()
  amountToSubstract: number;
}
