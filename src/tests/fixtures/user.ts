import { faker } from "@faker-js/faker/.";

export const fixtureUser = {
  id: faker.string.uuid(),
  email: faker.internet.email(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  password: faker.internet.password({
    length: 7,
  }),
};
