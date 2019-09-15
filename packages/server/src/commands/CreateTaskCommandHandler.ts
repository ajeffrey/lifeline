import * as Rx from 'rxjs';
import uuidv4 = require('uuid/v4');
import { ICreateTaskCommand, TaskCreatedReport } from '@ll/shared/src/commands/CreateTaskCommand';
import { IAnyEvent } from '@ll/shared/src/events';
import { TaskCreatedEvent } from '@ll/shared/src/events/TaskCreatedEvent';

export default class CreateTaskCommandHandler {
  constructor(private _events$: Rx.Subject<IAnyEvent>) {}

  handle(userId: string, { name }: ICreateTaskCommand) {
    const id = uuidv4();
    this._events$.next(TaskCreatedEvent({ id, creatorId: userId, name }));
    return TaskCreatedReport();
  }
}