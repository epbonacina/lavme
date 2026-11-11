import { DBResult } from "../index.ts";
import { ModelRepository } from "./index.ts";

export type NotPersistedClient = {
  name: string;
  address: string;
  phone: string;
};

export type PersistedClient = NotPersistedClient & { id: number };

export class ClientRepository
  extends ModelRepository<NotPersistedClient, PersistedClient> {
  protected initialize_database_table(): void {
    this.connection.exec(
      `CREATE TABLE IF NOT EXISTS clients (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE,
          address TEXT,
          phone TEXT UNIQUE
      );`,
    );
  }

  select(): DBResult<PersistedClient[]> {
    try {
      const stmt = this.connection.prepare(
        `SELECT id, name, address, phone FROM clients;`,
      );
      const rows = stmt.all() as PersistedClient[];
      return { success: true, value: rows };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  insert(data: NotPersistedClient): DBResult<PersistedClient> {
    try {
      const { changes, lastInsertRowid } = this.connection.prepare(
        `INSERT INTO clients (name, address, phone) VALUES (?, ?, ?);`,
      ).run(data.name, data.address, data.phone);

      if (changes === 0) {
        return {
          success: false,
          error: `Couldn't register client ${data} in the database.`,
        };
      }

      return {
        success: true,
        value: {
          id: lastInsertRowid as number,
          ...data,
        },
      };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  update(
    target_id: number,
    data: NotPersistedClient,
  ): DBResult<PersistedClient> {
    try {
      const { changes } = this.connection.prepare(
        `UPDATE clients SET name = ?, address = ?, phone = ? WHERE id = ?;`,
      ).run(data.name, data.address, data.phone, target_id);

      if (changes === 0) {
        return {
          success: false,
          error: `Client with ID ${target_id} not found or no changes made.`,
        };
      }

      return {
        success: true,
        value: {
          id: target_id,
          ...data,
        },
      };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  delete(target_id: number): DBResult<boolean> {
    try {
      const { changes } = this.connection.prepare(
        `DELETE FROM clients WHERE id = ?;`,
      ).run(target_id);

      if (changes === 0) {
        return {
          success: false,
          error: `Client with id ${target_id} not found.`,
        };
      }

      return {
        success: true,
        value: true,
      };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}
