import { Database } from "sqlite3";
import { IAnyEvent } from '@ll/shared/src/events';

const QUERY = `
  INSERT INTO events (
    eventType,
    tenantId,
    createdAt UNSIGNED BIGINT,
    payload TEXT
  ) VALUES (
    ?,
    ?,
    ?
    ?
  )
`

export default class EventStore {
  constructor(private _db: Database) {}

  persist(event: IAnyEvent) {
    this._db.run(QUERY, [event.type, event.tenantId, event.createdAt, JSON.stringify(event.payload)]);
  }
}