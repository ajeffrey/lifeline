import * as Rx from 'rxjs';
import uuidv4 = require('uuid/v4');
import { ICreateCardCommand, CardCreatedReport } from '@ll/shared/src/commands/CreateCardCommand';
import { IAnyEvent } from '@ll/shared/src/events';
import { CardCreatedEvent } from '@ll/shared/src/events/CardCreatedEvent';

export default class CreateCardCommandHandler {
  constructor(private _events$: Rx.Subject<IAnyEvent>) {}

  handle(userId: string, { name }: ICreateCardCommand) {
    const id = uuidv4();
    this._events$.next(CardCreatedEvent({ id, creatorId: userId, name, kind: 'pending' }));
    return CardCreatedReport();
  }
}