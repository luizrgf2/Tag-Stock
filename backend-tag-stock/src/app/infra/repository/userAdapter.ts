import { User } from '@prisma/client';
import { UserInterface } from 'src/app/core/entities/user';

export class UserAdapter {
  static prismaToInterface(user: User): UserInterface {
    return {
      ...user,
    };
  }

  static interfaceToPrisma(user: UserInterface): User {
    return {
      ...user,
    };
  }
}
