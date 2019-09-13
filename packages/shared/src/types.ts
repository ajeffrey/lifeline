export type Dictionary<T> = {[key: string]: T};

export type Colour = [number, number, number];

export interface IToken {
  userId: string;
  exp: number;
}

export interface IUserModel {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface ITaskModel {
  name: string;
}

export interface ITaskRecord {
  id: string;
  name: string;
}

export interface IContextModel {
  id: string;
  name: string;
  colour: Colour;
}

export interface ITimeBoxModel {
  start: number;
  end: number;
  context: string;
}

export interface ITimeBoxView {
  start: number;
  end: number;
  context: IContextModel;
}

export interface IUserScopeView {
  contexts: Dictionary<IContextModel>;
  tasks: ITaskModel[];
  timeboxes: ITimeBoxModel[];
}