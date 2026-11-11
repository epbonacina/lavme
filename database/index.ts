import { DatabaseSync } from "node:sqlite";
import { drizzle } from "drizzle-orm/node-sqlite";

import { DATABASE_URL } from "@/utils.ts";

const sqlite = new DatabaseSync(DATABASE_URL);
sqlite.exec("PRAGMA foreign_keys = ON;");
export const db = drizzle({ client: sqlite });

export type DBResult<T> =
  | { success: true; value: T }
  | { success: false; error: string };
