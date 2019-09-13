import * as jwt from 'jsonwebtoken'
import { IReauthCommand } from "@ll/shared/src/commands/ReauthCommand";
import { IToken } from '@ll/shared/src/types';

export default class ReauthCommandHandler {
  constructor(private _publicKey: string) {}

  handle({ token }: IReauthCommand): string | null {
    try {
      const claim = jwt.verify(token, this._publicKey, { algorithms: ['RS256'] }) as IToken | null;
      return claim && claim.exp > (Date.now() / 1000) ? claim.userId : null;
  
    } catch(err) {
      console.error(err);
      return null;
    }
  }


}