import { IAnyEvent } from '@ll/shared/src/events';
import TaskCreatedEventHandler from './events/TaskCreatedEventHandler';
import TaskDeletedEventHandler from './events/TaskDeletedEventHandler';

export default class EventHandler {
  constructor(
    private _taskCreatedEventHandler: TaskCreatedEventHandler,
    private _taskDeletedEventHandler: TaskDeletedEventHandler
    ) {}

  handle(event: IAnyEvent) {
    switch(event.type) {
      case 'task-created':
        return this._taskCreatedEventHandler.handle(event);
      case 'task-deleted':
        return this._taskDeletedEventHandler.handle(event);
    }
  }
}