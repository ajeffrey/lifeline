import { Database } from "sqlite3";
import { ITaskCreatedEvent } from "@ll/shared/src/events/TaskCreatedEvent";

const QUERY = `
  INSERT INTO tasks (aggregateId, creatorId, name) VALUES (?, ?, ?)
`;

export default class TaskCreatedEventHandler {
  constructor(private _db: Database) {}

  handle(event: ITaskCreatedEvent) {
    const { id, creatorId, name } = event.payload;
    this._db.run(QUERY, id, creatorId, name, err => {
      if(err) {
        console.error(err);
      }
    });
  }
}