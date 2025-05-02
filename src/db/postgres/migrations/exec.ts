import "dotenv/config";

import fs from "node:fs";
import path from "node:path";
import { pool } from "../client";
import { fileURLToPath } from "node:url";

//@ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function execMigrations() {
  const client = await pool.connect();
  try {
    const filepath = path.join(__dirname, "./01-init.sql");
    const script = fs.readFileSync(filepath, "utf-8");

    await client.query(script, []);

    console.log("Migrations executed successfully");
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
}

execMigrations();
