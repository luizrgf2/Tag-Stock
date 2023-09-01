import { Either, Left, Right } from '../errors/either';
import { ErrorBase } from '../errors/errorBase';
import { EmailError, EmailMessage } from '../errors/user/email';
import { NameError, NameMessage } from '../errors/user/name';
import { PasswordError, PasswordMessage } from '../errors/user/password';

export interface UserInterface {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserEntity {
  user: UserInterface;

  constructor(user: UserInterface) {
    this.user = user;
  }

  static isValidEmail(email: string): boolean {
    const emailRegex: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) return false;
    return true;
  }

  static isValidName(name: string): boolean {
    const containsNumberRegex: RegExp = /\d/;
    if (name.length === 0 || name.length > 30) return false;
    if (!containsNumberRegex.test(name)) return false;
    return true;
  }

  static isValidPassword(password: string): boolean {
    const passwordRegex: RegExp = /^(?=.*[A-Z]).{8,15}$/;
    if (!passwordRegex.test(password)) return false;
    return true;
  }

  static createWithValidations(
    user: Omit<UserInterface, 'id' | 'createdAt' | 'updatedAt'>,
  ): Either<ErrorBase, UserEntity> {
    const userData = new UserEntity({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '',
    });

    const isValidEmail = this.isValidEmail(userData.user.email);
    const isValidName = this.isValidName(userData.user.name);
    const isValidPassword = this.isValidPassword(userData.user.password);

    if (!isValidEmail)
      return Left.create<EmailError>(new EmailError(EmailMessage.invalid));
    if (!isValidName)
      return Left.create<NameError>(new NameError(NameMessage.invalid));
    if (!isValidPassword)
      return Left.create<PasswordError>(
        new PasswordError(PasswordMessage.invalid),
      );

    return Right.create(userData);
  }
}
