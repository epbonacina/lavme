import { DatabaseSync } from "node:sqlite";
import { DATABASE_URL } from "@/utils.ts";

export const db = new DatabaseSync(DATABASE_URL);

export type DBResult<T> =
  | { success: true; value: T }
  | { success: false; error: string };
