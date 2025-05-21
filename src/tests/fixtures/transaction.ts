import { faker } from "@faker-js/faker/.";

export const fixtureTransaction = {
  amount: Number(faker.finance.amount()),
  date: faker.date.anytime(),
  name: faker.commerce.productName(),
  type: "EARNING",
  user_id: faker.string.uuid(),
  id: faker.string.uuid(),
};
