export interface IDeleteTaskCommand {
  type: 'delete-task';
  id: string;
}

export interface ITaskDeletedReport {
  type: 'deleted';
}

export interface ITaskCreationErrorReport {
  type: 'error';
}

export type IDeleteTaskReport = ITaskDeletedReport | ITaskCreationErrorReport;

export function DeleteTaskCommand(id: string): IDeleteTaskCommand {
  return { type: 'delete-task', id };
}

export function isDeleteTaskCommand(command: any): command is IDeleteTaskCommand {
  return command && typeof command === 'object' && command.type === 'delete-task' && typeof command.id === 'string';
}

export function TaskDeletedReport(): ITaskDeletedReport {
  return { type: 'deleted' };
}

export function TaskCreationExceptionReport(): ITaskCreationErrorReport {
  return { type: 'error' };
}