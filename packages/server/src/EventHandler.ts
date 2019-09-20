import { Database } from 'sqlite3';
import { IAnyEvent } from '@ll/shared/src/events';
import { Dictionary } from '@ll/shared/src/types';

interface IEventHandler<T> {
  handle(event: T): any;
}

const CREATE_EVENT_QUERY = `
  INSERT INTO events(eventType, payload) VALUES (?, ?)
`

export default class EventHandler {
  private _handlers: Dictionary<IEventHandler<any>>;

  constructor(
    private _db: Database,
    ) {
      this._handlers = {};
    }

  register<T extends IAnyEvent>(type: T['type'], handler: IEventHandler<T>) {
    this._handlers[type] = handler;
  }

  handle(event: IAnyEvent) {
    if(event.type in this._handlers) {
      this._handlers[event.type].handle(event);
    }

    this._db.run(CREATE_EVENT_QUERY, event.type, JSON.stringify(event.payload));
  }
}