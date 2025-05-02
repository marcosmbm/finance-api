import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
});

export async function postgresHelper<T = any>(
  query: string,
  params: string[],
): Promise<T[]> {
  const client = await pool.connect();
  const result = await client.query(query, params);
  client.release();

  return result.rows;
}
