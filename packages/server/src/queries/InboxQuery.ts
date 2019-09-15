import * as Rx from 'rxjs';
import { Database } from "sqlite3";
import { IAnyEvent } from '@ll/shared/src/events';
import { IInboxState } from '@ll/shared/src/queries/InboxQuery';
import { isTaskCreatedEvent } from '@ll/shared/src/events/TaskCreatedEvent';
import { isTaskDeletedEvent } from '@ll/shared/src/events/TaskDeletedEvent';

const QUERY = `
  SELECT aggregateId as id, creatorId, name FROM tasks WHERE creatorId = ?`;

export default class InboxQuery {
  constructor(private _db: Database, private _events$: Rx.Subject<IAnyEvent>) {}

  query(userId: string) {
    return new Rx.Observable<IInboxState>(subscriber => {
      this._db.all(QUERY, userId, (err, tasks) => {
        if(err) {
          return subscriber.error(err);
        }

        subscriber.next(tasks);
        this._events$.subscribe(event => {
          if(isTaskCreatedEvent(event) && event.payload.creatorId === userId) {
            tasks.push(event.payload);
            subscriber.next(tasks);
          } else if(isTaskDeletedEvent(event)) {
            const taskIndex = tasks.findIndex(task => task.id === event.payload.id);
            if(taskIndex >= 0) {
              tasks.splice(taskIndex, 1);
              subscriber.next(tasks);
            }
          }
        })
      });
    });
  }
}