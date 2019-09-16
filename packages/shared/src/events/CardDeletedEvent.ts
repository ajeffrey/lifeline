import { ICard } from "../types";

export interface ICardDeletedEvent {
  type: 'card-deleted';
  payload: {
    id: string;
    deleterId: string;
  }
}

export function CardDeletedEvent(payload: ICardDeletedEvent['payload']): ICardDeletedEvent {
  return { type: 'card-deleted', payload };
}

function isPayload(payload: any): payload is ICardDeletedEvent['payload'] {
  return payload && typeof payload === 'object' && typeof payload.id === 'string' && typeof payload.deleterId === 'string';
}

export function isCardDeletedEvent(event: any): event is ICardDeletedEvent {
  return event && typeof event === 'object' && event.type === 'card-deleted' && isPayload(event.payload);
}