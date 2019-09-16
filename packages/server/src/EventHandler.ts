import { IAnyEvent } from '@ll/shared/src/events';
import CardCreatedEventHandler from './events/CardCreatedEventHandler';
import CardDeletedEventHandler from './events/CardDeletedEventHandler';

export default class EventHandler {
  constructor(
    private _cardCreatedEventHandler: CardCreatedEventHandler,
    private _cardDeletedEventHandler: CardDeletedEventHandler
    ) {}

  handle(event: IAnyEvent) {
    switch(event.type) {
      case 'card-created':
        return this._cardCreatedEventHandler.handle(event);
      case 'card-deleted':
        return this._cardDeletedEventHandler.handle(event);
    }
  }
}