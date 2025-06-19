export const env = {
  saltRounds: Number(process.env.BCRYPT_SALT_ROUNDS),
  jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
};
