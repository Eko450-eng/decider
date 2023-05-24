import type { Config } from "drizzle-kit";
 
export default {
  schema: "./db/migrations/schema.ts",
  out: "./db/migrations/",
  connectionString: process.env.DATABASE_URL
} satisfies Config;
