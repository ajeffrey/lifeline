import * as Rx from 'rxjs';
import { generate } from 'shortid';
import { QueryMessage, UnsubscribeMessage, isUpdateMessage, CommandMessage, isReportMessage } from '@ll/shared/src/messages';

export default class Socket {
  private _queries: Map<string, (val: any) => any>;
  private _commands: Map<string, (val: any) => any>;

  constructor(private _conn: WebSocket) {
    this._queries = new Map();
    this._commands = new Map();

    _conn.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if(isUpdateMessage(message)) {
        const callback = this._queries.get(message.id);
        if(callback) {
          callback(message.update);
        }

      } else if(isReportMessage(message)) {
        const callback = this._commands.get(message.id);
        if(callback) {
          callback(message.report);
        }
      }
    }
  }

  query<T>(query: any) {
    const id = generate();
    this._conn.send(JSON.stringify(QueryMessage(id, query)));

    return new Rx.Observable<T>(subscriber => {
      this._queries.set(id, val => subscriber.next(val));

      return () => {
        this._queries.delete(id);
        this._conn.send(JSON.stringify(UnsubscribeMessage(id)));
      };
    });
  }

  command<T>(command: any) {
    const id = generate();
    this._conn.send(JSON.stringify(CommandMessage(id, command)));

    return new Promise<T>(resolve => {
      this._commands.set(id, val => {
        resolve(val);
        this._commands.delete(id);
      });
    });
  }
}
