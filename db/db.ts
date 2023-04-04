import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

const pool = new Pool({
  host: '192.168.0.205',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'decider',
});

const db = drizzle(pool);

export default db

