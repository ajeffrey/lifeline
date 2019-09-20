import { ICard } from "../types";

export interface ICardCreatedEvent {
  type: 'card-created';
  payload: ICard;
}

export function CardCreatedEvent(payload: ICardCreatedEvent['payload']): ICardCreatedEvent {
  return { type: 'card-created', payload };
}

function isCard(payload: any): payload is ICard {
  return payload && typeof payload === 'object'
    && typeof payload.id === 'string' && typeof payload.creatorId === 'string' && typeof payload.name === 'string' && typeof payload.kind === 'string';
}

export function isCardCreatedEvent(event: any): event is ICardCreatedEvent {
  return event && typeof event === 'object' && event.type === 'card-created' && isCard(event.payload);
}