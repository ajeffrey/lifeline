import * as Rx from 'rxjs';
import { Database } from "sqlite3";
import { IAnyEvent } from '@ll/shared/src/events';
import { IInboxState } from '@ll/shared/src/queries/InboxQuery';
import { isCardCreatedEvent } from '@ll/shared/src/events/CardCreatedEvent';
import { isCardDeletedEvent } from '@ll/shared/src/events/CardDeletedEvent';

const QUERY = `
  SELECT id, creatorId, name, kind FROM cards WHERE creatorId = ?`;

export default class InboxQuery {
  constructor(private _db: Database, private _events$: Rx.Subject<IAnyEvent>) {}

  query(userId: string) {
    return new Rx.Observable<IInboxState>(subscriber => {
      this._db.all(QUERY, userId, (err, cards) => {
        if(err) {
          return subscriber.error(err);
        }

        subscriber.next(cards);
        this._events$.subscribe(event => {
          if(isCardCreatedEvent(event) && event.payload.creatorId === userId) {
            cards.push(event.payload);
            subscriber.next(cards);
          } else if(isCardDeletedEvent(event)) {
            const cardIndex = cards.findIndex(card => card.id === event.payload.id);
            if(cardIndex >= 0) {
              cards.splice(cardIndex, 1);
              subscriber.next(cards);
            }
          }
        })
      });
    });
  }
}