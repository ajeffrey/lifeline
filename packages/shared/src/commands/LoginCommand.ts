export interface ILoginCommand {
  type: 'login';
  email: string;
  password: string;
}

export interface ILoginSuccessReport {
  type: 'loggedIn';
  token: string;
}

export interface ILoginFailedReport {
  type: 'failed';
}

export interface ILoginExceptionReport {
  type: 'exception';
}

export type ILoginReport = ILoginSuccessReport | ILoginFailedReport | ILoginExceptionReport;

export function LoginCommand(email: string, password: string): ILoginCommand {
  return { type: 'login', email, password };
}

export function isLoginCommand(command: any): command is ILoginCommand {
  return command && typeof command === 'object' && command.type === 'login' && typeof command.email === 'string' && typeof command.password === 'string';
}

export function LoginSuccessReport(token: string): ILoginSuccessReport {
  return { type: 'loggedIn', token };
}

export function LoginFailedReport(): ILoginFailedReport {
  return { type: 'failed' };
}

export function LoginExceptionReport(): ILoginExceptionReport {
  return { type: 'exception' };
}