import * as Rx from 'rxjs';
import { isInboxQuery } from '@ll/shared/src/queries/InboxQuery';
import InboxQuery from './queries/InboxQuery';

export default class QueryFinder {
  constructor(private _userId: Rx.BehaviorSubject<string | null>, private _inboxQuery: InboxQuery) {

  }

  query(query: any) {
    const userId = this._userId.value;
    if(!userId) {
      throw new Error('You cannot do this as a guest');
    }

    if(isInboxQuery(query)) {
      return this._inboxQuery.query(userId);
    }

    return Rx.throwError('Invalid query');
  }
}