import * as React from 'react';
import { mkTime, dateToTime } from 'src/lib/time';
import { Context } from './Context';
import { IContextModel, ITaskModel, ITimeBoxModel, ITimeBoxView, Dictionary } from '@ll/shared/src/types';

interface IProps {
  children: React.ReactNode;
}

interface IState {
  now: Date;
  contexts: Dictionary<IContextModel>;
  tasks: ITaskModel[];
  timeboxes: ITimeBoxModel[];
}

const contexts: Dictionary<IContextModel> = {
  fitness: { id: 'fitness', name: 'Fitness', colour: [90, 30, 20], tasks: [] },
  business: { id: 'business', name: 'Business', colour: [90, 30, 250], tasks: [] },
  hobbies: { id: 'hobbies', name: 'Hobbies', colour: [90, 30, 60], tasks: [] },
  home: { id: 'home', name: 'Home', colour: [65, 55, 30], tasks: [] },
  work: { id: 'work', name: 'Work', colour: [65, 55, 180], tasks: [] },
};

const timeboxes: ITimeBoxModel[] = [
  { start: mkTime(10), end: mkTime(12), context: 'work' },
  { start: mkTime(12), end: mkTime(13), context: 'home' },
  { start: mkTime(13), end: mkTime(17.5), context: 'work' },
];

const tasks: ITaskModel[] = [];

const initial = {
  contexts,
  tasks,
  timeboxes,
};

export default ({ children }: IProps) => {
  const [state, setState] = React.useState<IState>({
    now: new Date(),
    ...initial
  });

  const { now } = state;

  React.useEffect(() => {
    const timer = setInterval(() => setState(state => ({ ...state, now: new Date() })), 500);
    return () => clearInterval(timer);
  });

  let timebox: ITimeBoxView | null = null;
  const nowTime = dateToTime(now);
  for(const option of state.timeboxes) {
    if(nowTime >= option.start && nowTime < option.end) {
      timebox = {
        ...option,
        context: contexts[option.context]
      };
      
      break;
    }
  }

  const timeboxes = state.timeboxes.map(timebox => ({
    ...timebox,
    context: state.contexts[timebox.context],
  })).sort((a, b) => a.start - b.start);

  return (
    <Context.Provider value={{ now, time: nowTime, timebox, timeboxes }}>
      {children}
    </Context.Provider>
  )
};