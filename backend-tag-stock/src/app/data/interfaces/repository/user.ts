import { UserEntity, UserInterface } from 'src/app/core/entities/user';
import { Either } from 'src/app/core/errors/either';
import { ErrorBase } from 'src/app/core/errors/errorBase';

export interface UserRepositoryInterface {
  findByEmail: (email: string) => Promise<Either<ErrorBase, UserEntity>>;
  findById: (id: string) => Promise<Either<ErrorBase, UserEntity>>;
  create: (
    user: Omit<UserInterface, 'id' | 'createdAt' | 'updatedAt'>,
  ) => Promise<Either<ErrorBase, UserEntity>>;
}
