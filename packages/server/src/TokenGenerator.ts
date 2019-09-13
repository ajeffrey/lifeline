import * as JWT from 'jsonwebtoken';

const EXPIRY_SECONDS = 60 * 60 * 24;

export default class TokenGenerator {
  constructor(private _privateKey: string) {}

  generate(userId: string) {
    const opts = { algorithm: 'RS256' };
    const token = JWT.sign({ exp: EXPIRY_SECONDS + (Date.now() / 1000), userId }, this._privateKey, opts);
    return token;
  }
}