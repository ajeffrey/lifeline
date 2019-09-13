import * as Rx from 'rxjs';
import QueryFinder from './QueryFinder';

export default class QueryManager {
  private _queries: Map<string, Rx.Subscriber<any>>;

  constructor(private _finder: QueryFinder) {
    this._queries = new Map();
  }

  subscribe(id: string, query: any, cb: (val: any) => any) {
    const observable = this._finder.query(query);
    this._queries[id] = observable.subscribe(cb);
  }

  unsubscribe(id: string) {
    const subscription = this._queries.get(id);
    if(subscription) {
      subscription.unsubscribe();
      this._queries.delete(id);
    }
  }
}
