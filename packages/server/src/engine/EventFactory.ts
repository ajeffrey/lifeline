import uuid = require('uuid/v4');
import { ICardCreatedEvent } from "@ll/shared/src/events/CardCreatedEvent";
import { IBaseEvent } from '@ll/shared/src/events/BaseEvent';
import { ICard } from '@ll/shared/src/types';

export default class EventFactory {
  constructor(private tenantId: string) {}

  private baseEvent(): IBaseEvent {
    return {
      tenantId: this.tenantId,
      uuid: uuid(),
      createdAt: new Date().getTime(),
    };
  }

  cardCreated(card: ICard): ICardCreatedEvent {
    return {
      type: 'card-created',
      payload: card,
      ...this.baseEvent(),
    };
  }
}