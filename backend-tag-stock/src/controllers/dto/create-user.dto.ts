import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'O campo de email não pode estar vazio' })
  email: string;

  @MaxLength(30, {
    message: 'O campo de senha deve ter no máximo 30 caracteres',
  })
  @MinLength(8, {
    message: 'O campo de senha deve ter no mínimo 8 caracteres',
  })
  password: string;

  @MaxLength(30, {
    message: 'O campo de nome deve ter no máximo 30 caracteres',
  })
  @MinLength(4, {
    message: 'O campo de nome deve ter no mínimo 4 caracteres',
  })
  name: string;
}
