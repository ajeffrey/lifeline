import * as SockJS from 'sockjs-client';
import Socket from './Socket';

export default () => {
  return new Promise<Socket>(resolve => {
    const conn = SockJS('http://localhost:8080/sockjs');
    conn.onopen = () => {
      const socket = new Socket(conn);
      resolve(socket);
    };
  });
}
