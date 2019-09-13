export interface IUnsubscribeMessage {
  unsub: string;
}

export function isUnsubscribeMessage(message: any): message is IUnsubscribeMessage {
  return message && typeof message === 'object' && typeof message.unsub === 'string';
}

export function UnsubscribeMessage(id: string): IUnsubscribeMessage {
  return { unsub: id };
}