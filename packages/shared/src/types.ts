export type Dictionary<T> = {[key: string]: T};

export type Colour = [number, number, number];

export interface IToken {
  userId: string;
  exp: number;
}

export interface ITask {
  id: string;
  creatorId: string;
  name: string;
}