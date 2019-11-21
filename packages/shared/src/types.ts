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

export interface ITask extends ICard {
  kind: 'task';
}

export interface IPending extends ICard {
  kind: 'pending';
}

export type IAnyCard = ITask | IPending;