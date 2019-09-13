export interface ICommandMessage<T> {
  id: string;
  command: T;
}

export function isCommandMessage(message: any): message is ICommandMessage<any> {
  return message && typeof message === 'object' && typeof message.id === 'string' && 'command' in message;
}

export function CommandMessage<T>(id: string, command: T): ICommandMessage<T> {
  return { id, command };
}