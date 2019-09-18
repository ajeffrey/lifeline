import { Database } from "sqlite3";
import { ICardDeletedEvent } from "@ll/shared/src/events/CardDeletedEvent";

const QUERY = `
  DELETE FROM cards WHERE id = ?
`;

export default class CardDeletedEventHandler {
  constructor(private _db: Database) {}

  handle(event: ICardDeletedEvent) {
    const { id } = event.payload;
    this._db.run(QUERY, id, err => {
      if(err) {
        console.error(err);
      }
    });
  }
}