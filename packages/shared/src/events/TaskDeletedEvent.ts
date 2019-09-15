import { ITask } from "../types";

export interface ITaskDeletedEvent {
  type: 'task-deleted';
  payload: {
    id: string;
    deleterId: string;
  }
}

export function TaskDeletedEvent(payload: ITaskDeletedEvent['payload']): ITaskDeletedEvent {
  return { type: 'task-deleted', payload };
}

function isPayload(payload: any): payload is ITaskDeletedEvent['payload'] {
  return payload && typeof payload === 'object' && typeof payload.id === 'string' && typeof payload.deleterId === 'string';
}

export function isTaskDeletedEvent(event: any): event is ITaskDeletedEvent {
  return event && typeof event === 'object' && event.type === 'task-deleted' && isPayload(event.payload);
}