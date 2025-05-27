const { beforeEach } = require("@jest/globals");
const { prisma } = require("./src/db/prisma");

beforeEach(async () => {
  await prisma.transaction.deleteMany({});
  await prisma.user.deleteMany({});
});
