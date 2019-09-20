export type Dictionary<T> = {[key: string]: T};

export type Colour = [number, number, number];

export interface IToken {
  userId: string;
  exp: number;
}

export interface ICard {
  id: string;
  creatorId: string;
  name: string;
  kind: IAnyCard['kind'];
}

export interface ISubTask {
  id: string;
  name: string;
  complete: boolean;
}

export interface ITask extends ICard {
  kind: 'task';
  subtasks: ISubTask[];
}

export interface IPending extends ICard {
  kind: 'pending';
}

export interface IEvent extends ICard {
  kind: 'event';
}

export interface IHabit extends ICard {
  kind: 'habit';
}

export type IAnyCard = ITask | IPending | IEvent | IHabit;