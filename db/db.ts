import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  host: `${process.env.HOST}`,
  port: 5432,
  user: `${process.env.POSTGRES_USER}`,
  password: `${process.env.POSTGRES_PASS}`,
  database: `${process.env.POSTGRES_DB}`,
});

const db = drizzle(pool);

export default db

