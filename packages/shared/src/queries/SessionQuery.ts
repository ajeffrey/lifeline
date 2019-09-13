export interface ISessionQuery {
  type: 'session';
}

export type ISessionState = string | null;

export function SessionQuery(): ISessionQuery {
  return { type: 'session' };
}

export function isSessionQuery(query: any): query is ISessionQuery {
  return query && typeof query === 'object' && query.type === 'session';
}
