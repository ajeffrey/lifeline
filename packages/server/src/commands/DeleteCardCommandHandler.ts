import * as Rx from 'rxjs';
import { IDeleteCardCommand, CardDeletedReport } from '@ll/shared/src/commands/DeleteCardCommand';
import { IAnyEvent } from '@ll/shared/src/events';
import { CardDeletedEvent } from '@ll/shared/src/events/CardDeletedEvent';

export default class DeleteCardCommandHandler {
  constructor(private _events$: Rx.Subject<IAnyEvent>) {}

  handle(userId: string, { id }: IDeleteCardCommand) {
    this._events$.next(CardDeletedEvent({ id, deleterId: userId }));
    return CardDeletedReport();
  }
}