import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
dotenv.config({
  path: ".env.local",
});

// Allow self-signed cert chain for local dev (Supabase + node-postgres)
if (process.env.NODE_ENV !== "production") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED =
    process.env.NODE_TLS_REJECT_UNAUTHORIZED || "0";
}

const connectionString =
  process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "Missing POSTGRES_URL_NON_POOLING or DATABASE_URL in environment. Check .env.local",
  );
}

const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
export const db = drizzle(pool, { schema });
