import dotenv from "dotenv";
import type { Config } from "drizzle-kit";
dotenv.config({
  path: ".env.local",
});
// For Supabase self-signed cert chains during CLI connections
process.env.NODE_TLS_REJECT_UNAUTHORIZED =
  process.env.NODE_TLS_REJECT_UNAUTHORIZED || "0";
export default {
  schema: "./src/db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL_NON_POOLING!,
    ssl: { rejectUnauthorized: false },
  },
} satisfies Config;
