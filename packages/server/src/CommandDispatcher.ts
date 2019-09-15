import * as Rx from 'rxjs';
import { isLoginCommand, LoginExceptionReport, LoginSuccessReport, LoginFailedReport } from '@ll/shared/src/commands/LoginCommand';
import { isReauthCommand } from '@ll/shared/src/commands/ReauthCommand';
import LoginCommandHandler from './commands/LoginCommandHandler';
import ReauthCommandHandler from './commands/ReauthCommandHandler';
import TokenGenerator from './TokenGenerator';
import { isCreateTaskCommand } from '@ll/shared/src/commands/CreateTaskCommand';
import CreateTaskCommandHandler from './commands/CreateTaskCommandHandler';
import DeleteTaskCommandHandler from './commands/DeleteTaskCommandHandler';
import { isDeleteTaskCommand } from '@ll/shared/src/commands/DeleteTaskCommand';

export default class CommandDispatcher {
  constructor(
    private _userId: Rx.BehaviorSubject<string | null>,
    private _tokenGenerator: TokenGenerator,
    private _loginHandler: LoginCommandHandler,
    private _reauthHandler: ReauthCommandHandler,
    private _createTaskHandler: CreateTaskCommandHandler,
    private _deleteTaskHandler: DeleteTaskCommandHandler
    ) {}

  async dispatch(command: any) {
    if(isLoginCommand(command) || isReauthCommand(command)) {
      try {
        const userId = await (() => {
          switch(command.type) {
            case 'login': return this._loginHandler.handle(command);
            case 'reauth': return this._reauthHandler.handle(command);
          }
        })();

        if(userId) {
          const token = this._tokenGenerator.generate(userId);
          this._userId.next(userId);
          return LoginSuccessReport(token);

        } else {
          return LoginFailedReport();
        }

      } catch(err) {
        return LoginExceptionReport();
      }

    } else {
      const userId = this._userId.value;
      if(!userId) {
        throw new Error('You cannot do this as a guest');
      }

      if(isCreateTaskCommand(command)) {
        return this._createTaskHandler.handle(userId, command);

      } else if(isDeleteTaskCommand(command)) {
        return this._deleteTaskHandler.handle(userId, command);

      } else {
        throw new Error('Command not found');
      }
    }
  }
}