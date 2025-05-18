import bcrypt from "bcryptjs";

export class HasherAdapter {
  private readonly saltRounds: number;

  constructor(saltRounds: number) {
    this.saltRounds = saltRounds;
  }

  async hash(value: string) {
    return await bcrypt.hash(value, this.saltRounds);
  }

  async compare(value: string, hash: string) {
    return await bcrypt.compare(value, hash);
  }
}
