export interface IQueryMessage<T> {
  id: string;
  query: T;
}

export function isQueryMessage(message: any): message is IQueryMessage<any> {
  return message && typeof message === 'object' && typeof message.id === 'string' && 'query' in message;
}

export function QueryMessage<T>(id: string, query: T): IQueryMessage<T> {
  return { id, query };
}