import { compareSync } from 'bcryptjs';
import { Database } from "sqlite3";
import { ILoginCommand } from '@ll/shared/src/commands/LoginCommand';

const QUERY = `
  SELECT id, password FROM users WHERE email = ?
`;

export default class LoginCommandHandler {
  constructor(private _db: Database) {}

  handle({ email, password }: ILoginCommand) {
    return new Promise<string | null>((resolve, reject) => {
      this._db.get(QUERY, email, (err, row) => {
        if(err) {
          return reject(err);
        }
        
        resolve(compareSync(password, row.password) ? row.id : null);
      });
    });
  }
}