import * as Rx from 'rxjs';
import { isLoginCommand, LoginExceptionReport, LoginSuccessReport, LoginFailedReport } from '@ll/shared/src/commands/LoginCommand';
import { isReauthCommand } from '@ll/shared/src/commands/ReauthCommand';
import LoginCommandHandler from './commands/LoginCommandHandler';
import ReauthCommandHandler from './commands/ReauthCommandHandler';
import TokenGenerator from './TokenGenerator';
import { isCreateCardCommand } from '@ll/shared/src/commands/CreateCardCommand';
import CreateCardCommandHandler from './commands/CreateCardCommandHandler';
import DeleteCardCommandHandler from './commands/DeleteCardCommandHandler';
import { isDeleteCardCommand } from '@ll/shared/src/commands/DeleteCardCommand';

export default class CommandDispatcher {
  constructor(
    private _userId: Rx.BehaviorSubject<string | null>,
    private _tokenGenerator: TokenGenerator,
    private _loginHandler: LoginCommandHandler,
    private _reauthHandler: ReauthCommandHandler,
    private _createCardHandler: CreateCardCommandHandler,
    private _deleteCardHandler: DeleteCardCommandHandler
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

      if(isCreateCardCommand(command)) {
        return this._createCardHandler.handle(userId, command);

      } else if(isDeleteCardCommand(command)) {
        return this._deleteCardHandler.handle(userId, command);

      } else {
        throw new Error('Command not found');
      }
    }
  }
}