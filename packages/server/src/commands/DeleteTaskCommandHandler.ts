import * as Rx from 'rxjs';
import { IDeleteTaskCommand, TaskDeletedReport } from '@ll/shared/src/commands/DeleteTaskCommand';
import { IAnyEvent } from '@ll/shared/src/events';
import { TaskDeletedEvent } from '@ll/shared/src/events/TaskDeletedEvent';

export default class DeleteTaskCommandHandler {
  constructor(private _events$: Rx.Subject<IAnyEvent>) {}

  handle(userId: string, { id }: IDeleteTaskCommand) {
    this._events$.next(TaskDeletedEvent({ id, deleterId: userId }));
    return TaskDeletedReport();
  }
}