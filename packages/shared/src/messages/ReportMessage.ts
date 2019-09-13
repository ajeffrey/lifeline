export interface IReportMessage<T> {
  id: string;
  report: T;
}

export function isReportMessage(message: any): message is IReportMessage<any> {
  return message && typeof message === 'object' && typeof message.id === 'string' && 'report' in message;
}

export function ReportMessage<T>(id: string, report: T): IReportMessage<T> {
  return { id, report };
}
