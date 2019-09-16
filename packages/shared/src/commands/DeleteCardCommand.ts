export interface IDeleteCardCommand {
  type: 'delete-card';
  id: string;
}

export interface ICardDeletedReport {
  type: 'deleted';
}

export interface ICardCreationErrorReport {
  type: 'error';
}

export type IDeleteCardReport = ICardDeletedReport | ICardCreationErrorReport;

export function DeleteCardCommand(id: string): IDeleteCardCommand {
  return { type: 'delete-card', id };
}

export function isDeleteCardCommand(command: any): command is IDeleteCardCommand {
  return command && typeof command === 'object' && command.type === 'delete-card' && typeof command.id === 'string';
}

export function CardDeletedReport(): ICardDeletedReport {
  return { type: 'deleted' };
}

export function CardCreationExceptionReport(): ICardCreationErrorReport {
  return { type: 'error' };
}