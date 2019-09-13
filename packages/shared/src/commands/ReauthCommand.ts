export interface IReauthCommand {
  type: 'reauth';
  token: string;
}

export function ReauthCommand(token: string): IReauthCommand {
  return { type: 'reauth', token };
}

export function isReauthCommand(command: any): command is IReauthCommand {
  return command && typeof command === 'object' && command.type === 'reauth' && typeof command.token === 'string';
}
