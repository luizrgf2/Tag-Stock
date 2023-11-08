import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { CreateUserService } from './user/create-user.service';
import { FindOneUserService } from './user/find-user-with-email-or-id.service';
import { CreateUserUseCaseOutput } from '../app/core/interfaces/useCases/user/createUser';
import { FindOneUserCaseOutput } from '../app/core/interfaces/useCases/user/findOneUser';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findUserService: FindOneUserService,
  ) {}

  @Post('create')
  @HttpCode(201)
  async create(@Body() body: CreateUserDTO): Promise<CreateUserUseCaseOutput> {
    const response = await this.createUserService.exec(body);
    if (response.left)
      throw new HttpException(response.left.message, response.left.code);
    return response.right;
  }

  @UseGuards(AuthGuard)
  @Get('find')
  async findWithEmailOrId(@Query() query): Promise<FindOneUserCaseOutput> {
    const response = await this.findUserService.exec(query);
    if (response.left)
      throw new HttpException(response.left.message, response.left.code);
    return response.right;
  }
}
