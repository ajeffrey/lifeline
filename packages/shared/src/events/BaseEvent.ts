import { isShape, IValidator, equals, isUUID, isNumber } from '../validation';

export interface IBaseEvent {
  uuid: string;
  tenantId: string;
  createdAt: number;
}
