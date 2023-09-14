import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserUseCaseInput } from 'src/app/core/interfaces/useCases/user/createUser';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  @Post('create')
  @HttpCode(201)
  create(@Body() body: CreateUserDTO): CreateUserUseCaseInput {
    const { email, name, password } = body;
    
  }
}