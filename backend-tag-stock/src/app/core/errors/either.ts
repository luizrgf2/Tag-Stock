export class Right<T> {
  left: undefined;
  right: T;

  constructor(value: T) {
    this.right = value;
  }
  static create<T>(value: T) {
    return new Right<T>(value);
  }
}

export class Left<T> {
  right: undefined;
  left: T;

  constructor(value: T) {
    this.left = value;
  }

  static create<T>(value: T) {
    return new Left<T>(value);
  }
}

export type Either<L, R> = Left<L> | Right<R>;
