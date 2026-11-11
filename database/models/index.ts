import { DatabaseSync } from "node:sqlite";
import { DBResult } from "../index.ts";

export abstract class ModelRepository<
  NotPersistedModel,
  PersistedModel = NotPersistedModel & { id: number },
> {
  constructor(protected connection: DatabaseSync) {
    this.initialize_database_table();
  }

  protected abstract initialize_database_table(): void;
  abstract select(): DBResult<PersistedModel[]>;
  abstract insert(data: NotPersistedModel): DBResult<PersistedModel>;
  abstract update(
    target_id: number,
    data: NotPersistedModel,
  ): DBResult<PersistedModel>;
  abstract delete(target_id: number): DBResult<boolean>;
}
