import * as React from 'react';
import Socket from './Socket';

interface ISocketContext {
  socket: Socket;
}

export default React.createContext<ISocketContext>({} as any);
