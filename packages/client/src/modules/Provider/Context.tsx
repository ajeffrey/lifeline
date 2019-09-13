import * as React from 'react';
import { ITimeBoxView } from '@ll/shared/src/types';

export interface IContext {
  now: Date;
  time: number;
  timebox: ITimeBoxView | null;
  timeboxes: ITimeBoxView[];
}

export const Context = React.createContext<IContext>({} as IContext);