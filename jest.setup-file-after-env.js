const { beforeEach } = require("@jest/globals");
const { prisma } = require("./src/db/prisma");

beforeEach(async () => {
  await prisma.user.deleteMany({});
  await prisma.transaction.deleteMany({});
});
