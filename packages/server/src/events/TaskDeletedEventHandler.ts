import { Database } from "sqlite3";
import { ITaskDeletedEvent } from "@ll/shared/src/events/TaskDeletedEvent";

const QUERY = `
  DELETE FROM tasks WHERE aggregateId = ?
`;

export default class TaskDeletedEventHandler {
  constructor(private _db: Database) {}

  handle(event: ITaskDeletedEvent) {
    const { id } = event.payload;
    this._db.run(QUERY, id, err => {
      if(err) {
        console.error(err);
      }
    });
  }
}