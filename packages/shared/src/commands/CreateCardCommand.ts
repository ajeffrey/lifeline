export interface ICreateCardCommand {
  type: 'create-card';
  name: string;
}

export interface ICardCreatedReport {
  type: 'created';
}

export interface ICardCreationErrorReport {
  type: 'error';
}

export type ICreateCardReport = ICardCreatedReport | ICardCreationErrorReport;

export function CreateCardCommand(name: string): ICreateCardCommand {
  return { type: 'create-card', name };
}

export function isCreateCardCommand(command: any): command is ICreateCardCommand {
  return command && typeof command === 'object' && command.type === 'create-card' && typeof command.name === 'string';
}

export function CardCreatedReport(): ICardCreatedReport {
  return { type: 'created' };
}

export function CardCreationExceptionReport(): ICardCreationErrorReport {
  return { type: 'error' };
}