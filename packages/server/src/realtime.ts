import * as Rx from 'rxjs';
import * as SockJS from 'sockjs';
import { Database } from 'sqlite3';
import { isQueryMessage, isUnsubscribeMessage, UpdateMessage, isCommandMessage, ReportMessage } from '@ll/shared/src/messages';
import QueryManager from './QueryManager';
import QueryFinder from './QueryFinder';
import CommandDispatcher from './CommandDispatcher';
import TokenGenerator from './TokenGenerator';
import LoginCommandHandler from './commands/LoginCommandHandler';
import ReauthCommandHandler from './commands/ReauthCommandHandler';
import { IAnyEvent } from '@ll/shared/src/events';
import CreateCardCommandHandler from './commands/CreateCardCommandHandler';
import CardCreatedEventHandler from './events/CardCreatedEventHandler';
import EventHandler from './EventHandler';
import InboxQuery from './queries/InboxQuery';
import CardDeletedEventHandler from './events/CardDeletedEventHandler';
import DeleteCardCommandHandler from './commands/DeleteCardCommandHandler';

export default (db: Database, publicKey: string, privateKey: string) => {
  const events$ = new Rx.Subject<IAnyEvent>();
  const tokenGenerator = new TokenGenerator(privateKey);
  const loginCommandHandler = new LoginCommandHandler(db);
  const reauthCommandHandler = new ReauthCommandHandler(publicKey);
  const createCardCommandHandler = new CreateCardCommandHandler(events$);
  const deleteCardCommandHandler = new DeleteCardCommandHandler(events$);

  const eventHandler = new EventHandler(db);
  const cardCreatedEventHandler = new CardCreatedEventHandler(db);
  const cardDeletedEventHandler = new CardDeletedEventHandler(db);
  eventHandler.register('card-created', cardCreatedEventHandler);
  eventHandler.register('card-deleted', cardDeletedEventHandler);
  events$.subscribe(event => eventHandler.handle(event));

  const inboxQuery = new InboxQuery(db, events$);

  const server = SockJS.createServer({
    sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js',
    prefix: '/sockjs'
  });
  
  server.on('connection', connection => {
    const userId = new Rx.BehaviorSubject<string | null>(null);
    const commandDispatcher = new CommandDispatcher(
      userId,
      tokenGenerator,
      loginCommandHandler,
      reauthCommandHandler,
      createCardCommandHandler,
      deleteCardCommandHandler
    );

    const queryFinder = new QueryFinder(userId, inboxQuery);
    const queryManager = new QueryManager(queryFinder);
    
    connection.on('data', data => {
      const message = JSON.parse(data);

      if(isUnsubscribeMessage(message)) {
        const id = message.unsub;
        queryManager.unsubscribe(id);
      }

      if(isQueryMessage(message)) {
        queryManager.subscribe(message.id, message.query, update => {
          connection.write(JSON.stringify(UpdateMessage(message.id, update)));
        });
      }

      if(isCommandMessage(message)) {
        commandDispatcher.dispatch(message.command).then(report => {
          connection.write(JSON.stringify(ReportMessage(message.id, report)));
        })
      }
    });
  });

  return server;
};
