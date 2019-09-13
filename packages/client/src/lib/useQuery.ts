import * as React from 'react';
import * as Rx from 'rxjs';
import SocketContext from 'src/API/SocketContext';

export default function useQuery<T>(query: any, watch: any[]) {
  const { socket } = React.useContext(SocketContext);
  const [state, setState] = React.useState<T | undefined>();
  React.useEffect(() => {
    const subscription = socket.query<T>(query).subscribe(value => {
      setState(value);
    });

    return () => subscription.unsubscribe();
  }, watch);

  return state;
}