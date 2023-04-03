// db.js
import { Pool } from "pg";

let conn: any;

if (!conn) {
  conn = new Pool({
    user: process.env.NEXT_PUBLIC_PGSQL_USER,
    password: process.env.NEXT_PUBLIC_PGSQL_PASSWORD,
    host: process.env.NEXT_PUBLIC_PGSQL_HOST,
    port: 5432,
    database: process.env.NEXT_PUBLIC_PGSQL_DATABASE,
  });
}

export default conn;
