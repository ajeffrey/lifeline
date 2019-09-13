import * as Rx from 'rxjs';
import { isLoginCommand, LoginExceptionReport, LoginSuccessReport, LoginFailedReport } from '@ll/shared/src/commands/LoginCommand';
import { isReauthCommand } from '@ll/shared/src/commands/ReauthCommand';
import LoginCommandHandler from './commands/LoginCommandHandler';
import ReauthCommandHandler from './commands/ReauthCommandHandler';
import TokenGenerator from './TokenGenerator';

export default class CommandDispatcher {
  constructor(
    private _userId: Rx.BehaviorSubject<string | null>,
    private _tokenGenerator: TokenGenerator,
    private _loginHandler: LoginCommandHandler,
    private _reauthHandler: ReauthCommandHandler
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
      return { type: 'exception', error: 'command not found' };
    }
  }
}