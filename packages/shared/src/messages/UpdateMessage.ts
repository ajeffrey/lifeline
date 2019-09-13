export interface IUpdateMessage<T> {
  id: string;
  update: T;
}

export function isUpdateMessage(message: any): message is IUpdateMessage<any> {
  return message && typeof message === 'object' && typeof message.id === 'string' && 'update' in message;
}

export function UpdateMessage<T>(id: string, update: T) {
  return { id, update };
}