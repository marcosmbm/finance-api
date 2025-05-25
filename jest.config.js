/** @type {import('jest').Config} */
module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  watchPathIgnorePatterns: ["<rootDir>/.postgres-data"],
  globalSetup: "<rootDir>/jest.global-setup.js",
};
