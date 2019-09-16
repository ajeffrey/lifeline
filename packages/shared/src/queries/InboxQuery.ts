import { ICard } from "../types";

export interface IInboxQuery {
  type: 'inbox';
}

export type IInboxState = ICard[];

export function InboxQuery(): IInboxQuery {
  return { type: 'inbox' };
}

export function isInboxQuery(query: any): query is IInboxQuery {
  return query && typeof query === 'object' && query.type === 'inbox';
}