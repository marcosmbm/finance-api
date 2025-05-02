export class UserNotFoundError extends Error {
  constructor(userId: string) {
    super(`User with id ${userId} not found.`);
    this.name = "UserNotFoundError";
  }
}

export class EmailAlreadyInUseError extends Error {
  constructor(email: string) {
    super(`The ${email} is already in use`);
    this.name = "EmailAlreadyInUseError";
  }
}
