import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "./utils.ts";

export default defineConfig({
  out: "./drizzle",
  schema: "./database/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
