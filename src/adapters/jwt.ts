import { env } from "@/config/env";
import jwt from "jsonwebtoken";

export class JwtAdapter {
  async sign(payload: object, options?: { expiresIn: any }): Promise<string> {
    return jwt.sign(payload, env.jwtAccessTokenSecret as string, {
      expiresIn: options?.expiresIn,
    });
  }
}
