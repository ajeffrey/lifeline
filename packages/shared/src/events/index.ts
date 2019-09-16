import { ICardCreatedEvent } from './CardCreatedEvent';
import { ICardDeletedEvent } from './CardDeletedEvent';

export type IAnyEvent = (
  ICardCreatedEvent |
  ICardDeletedEvent
);