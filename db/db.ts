import { Pool } from 'pg';
import { drizzle } from "drizzle-orm/vercel-postgres";
import * as schema from "@/db/migrations/schema"

const pool = new Pool({
  host: `${process.env.NEXT_PUBLIC_POSTGRES_HOST}`,
  port: 5432,
  user: `${process.env.NEXT_PUBLIC_POSTGRES_USER}`,
  password: `${process.env.NEXT_PUBLIC_POSTGRES_PASS}`,
  database: `${process.env.NEXT_PUBLIC_POSTGRES_DB}`,
});

const db = drizzle(pool, {schema});

export default db
