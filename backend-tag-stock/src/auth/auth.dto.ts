import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @IsNotEmpty({ message: 'O campo de email não pode estar vazio' })
  @IsString({ message: 'O campo de email deve ser um texto' })
  email: string;
  @IsNotEmpty({ message: 'O campo de senha não pode estar vazio' })
  @IsString({ message: 'O campo de senha deve ser um texto' })
  pass: string;
}
