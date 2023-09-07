import { Either, Left, Right } from 'src/app/core/errors/either';
import { ErrorBase } from 'src/app/core/errors/errorBase';
import {
  FindOneUserCaseInput,
  FindOneUserCaseInterface,
  FindOneUserCaseOutput,
} from 'src/app/core/interfaces/useCases/user/findOneUser';
import { UserRepositoryInterface } from '../../interfaces/repository/user';

export class FindOneUserUseCase implements FindOneUserCaseInterface {
  constructor(private readonly userRepo: UserRepositoryInterface) {}

  async exec(
    input: FindOneUserCaseInput,
  ): Promise<Either<ErrorBase, FindOneUserCaseOutput>> {
    const { email, id } = input;

    if (!email && !id)
      return Left.create(new ErrorBase('email e id não existem!', 400));

    if (email) {
      const userOrError = await this.userRepo.findByEmail(email);
      if (userOrError.left) return Left.create(userOrError.left);
      return Right.create({
        user: userOrError.right.user,
      });
    } else if (id) {
      const userOrError = await this.userRepo.findById(id);
      if (userOrError.left) return Left.create(userOrError.left);
      return Right.create({
        user: userOrError.right.user,
      });
    }
  }
}
