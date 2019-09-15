import { ITaskCreatedEvent } from './TaskCreatedEvent';
import { ITaskDeletedEvent } from './TaskDeletedEvent';

export type IAnyEvent = (
  ITaskCreatedEvent |
  ITaskDeletedEvent
);