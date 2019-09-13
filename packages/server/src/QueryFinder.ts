import * as Rx from 'rxjs';

export default class QueryFinder {
  constructor(private _userId: Rx.BehaviorSubject<string | null>) {

  }

  query(query: any) {
    return Rx.throwError('Invalid query');
  }
}