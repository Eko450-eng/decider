import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@/db/migrations/schema";
import postgres from 'postgres'

const client = postgres({
  host: process.env.NEXT_PUBLIC_POSTGRES_HOST,
  database: process.env.NEXT_PUBLIC_POSTGRES_DB,
  pass: process.env.NEXT_PUBLIC_POSTGRES_PASS,
  user: process.env.NEXT_PUBLIC_POSTGRES_USER
})

const db = drizzle(client, { schema });

export default db;
