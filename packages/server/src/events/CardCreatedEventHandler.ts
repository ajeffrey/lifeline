import { Database } from "sqlite3";
import { ICardCreatedEvent } from "@ll/shared/src/events/CardCreatedEvent";

const QUERY = `
  INSERT INTO cards (id, creatorId, name, kind) VALUES (?, ?, ?, ?)
`;

export default class CardCreatedEventHandler {
  constructor(private _db: Database) {}

  handle(event: ICardCreatedEvent) {
    const { id, creatorId, name, kind } = event.payload;
    this._db.run(QUERY, id, creatorId, name, kind, err => {
      if(err) {
        console.error(err);
      }
    });
  }
}
