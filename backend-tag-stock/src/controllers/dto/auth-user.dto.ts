import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class AuthUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(30)
  @MinLength(8)
  password: string;
}
