import * as React from 'react';

export interface INotificationContext {
  success(message: string);
  error(message: string);
}

export default React.createContext<INotificationContext>({} as any);
