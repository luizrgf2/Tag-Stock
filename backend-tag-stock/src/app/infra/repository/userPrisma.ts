import { PrismaClient } from '@prisma/client';
import { UserEntity, UserInterface } from 'src/app/core/entities/user';
import { Either, Left, Right } from 'src/app/core/errors/either';
import { ErrorBase } from 'src/app/core/errors/errorBase';
import { UserNotExistsError } from 'src/app/data/errors/user';
import { UserRepositoryInterface } from 'src/app/data/interfaces/repository/user';
import { UserAdapter } from './userAdapter';
import { ServerError, ServerErrorMessage } from '../errors/server';

export class UserPrismaRepository implements UserRepositoryInterface {
  constructor(private prismaClient: PrismaClient) {}

  async findByEmail(email: string): Promise<Either<ErrorBase, UserEntity>> {
    try {
      const userData = await this.prismaClient.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!userData) return Left.create(new UserNotExistsError());
      const userEntity = new UserEntity(
        UserAdapter.prismaToInterface(userData),
      );
      return Right.create(userEntity);
    } catch (e) {
      return Left.create(new ServerError(ServerErrorMessage.findUserByEmail));
    }
  }

  async findById(id: string): Promise<Either<ErrorBase, UserEntity>> {
    try {
      const userData = await this.prismaClient.user.findFirst({
        where: {
          id: id,
        },
      });

      if (!userData) return Left.create(new UserNotExistsError());
      const userEntity = new UserEntity(
        UserAdapter.prismaToInterface(userData),
      );
      return Right.create(userEntity);
    } catch (e) {
      return Left.create(new ServerError(ServerErrorMessage.findUserById));
    }
  }

  async create(
    user: Omit<UserInterface, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Either<ErrorBase, UserEntity>> {
    try {
      const userConverted = UserAdapter.interfaceToPrisma({
        ...user,
        id: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const userCreate = await this.prismaClient.user.create({
        data: {
          email: userConverted.email,
          name: userConverted.name,
          password: userConverted.password,
        },
      });

      if (!userCreate) return Left.create(new UserNotExistsError());
      const userEntity = new UserEntity(
        UserAdapter.prismaToInterface(userCreate),
      );
      return Right.create(userEntity);
    } catch (e) {
      return Left.create(new ServerError(ServerErrorMessage.findUserById));
    }
  }
}
