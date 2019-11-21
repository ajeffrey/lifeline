import { ICard } from "../types";
import { IBaseEvent } from "./BaseEvent";

export interface ICardCreatedEvent extends IBaseEvent {
  type: 'card-created';
  payload: ICard;
}
