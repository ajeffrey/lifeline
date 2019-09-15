export interface ICreateTaskCommand {
  type: 'create-task';
  name: string;
}

export interface ITaskCreatedReport {
  type: 'created';
}

export interface ITaskCreationErrorReport {
  type: 'error';
}

export type ICreateTaskReport = ITaskCreatedReport | ITaskCreationErrorReport;

export function CreateTaskCommand(name: string): ICreateTaskCommand {
  return { type: 'create-task', name };
}

export function isCreateTaskCommand(command: any): command is ICreateTaskCommand {
  return command && typeof command === 'object' && command.type === 'create-task' && typeof command.name === 'string';
}

export function TaskCreatedReport(): ITaskCreatedReport {
  return { type: 'created' };
}

export function TaskCreationExceptionReport(): ITaskCreationErrorReport {
  return { type: 'error' };
}