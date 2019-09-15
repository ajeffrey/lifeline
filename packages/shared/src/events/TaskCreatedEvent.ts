import { ITask } from "../types";

export interface ITaskCreatedEvent {
  type: 'task-created';
  payload: ITask;
}

export function TaskCreatedEvent(payload: ITaskCreatedEvent['payload']): ITaskCreatedEvent {
  return { type: 'task-created', payload };
}

function isTask(payload: any): payload is ITask {
  return payload && typeof payload === 'object'
    && typeof payload.id === 'string' && typeof payload.creatorId === 'string' && typeof payload.name === 'string';
}

export function isTaskCreatedEvent(event: any): event is ITaskCreatedEvent {
  return event && typeof event === 'object' && event.type === 'task-created' && isTask(event.payload);
}