import * as HTTP from 'http';
import chalk from 'chalk';
import * as fs from 'fs';
import { Database } from 'sqlite3';
import realtimeServer from './realtime';
import { env } from './lib';

const db = new Database(env('DB_PATH'));

const publicKey = fs.readFileSync(env('JWT_PUBLIC_KEY_PATH'), 'utf8');
const privateKey = fs.readFileSync(env('JWT_PRIVATE_KEY_PATH'), 'utf8');

const realtime = realtimeServer(db, publicKey, privateKey);

const server = HTTP.createServer();
realtime.installHandlers(server);

const port = process.env.PORT || '8080';
server.listen(port, () => {
  console.log(`server started on port ${chalk.green(port)}`);
});