const { execSync } = require("node:child_process");

module.exports = async () => {
  execSync("docker compose up -d --wait finance_db_test");
  execSync("npm run db:push");
};
