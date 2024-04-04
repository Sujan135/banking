import { Pool } from "pg";

export const pool = new Pool({
  port: 5432,
  host: "localhost",
  user: "postgres",
  password: "Nepal135",
  database: "tdbank",
});
