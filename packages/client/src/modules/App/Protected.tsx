import * as React from 'react';
import { LoginCommand, ILoginReport } from '@ll/shared/src/commands/LoginCommand';
import { ReauthCommand } from '@ll/shared/src/commands/ReauthCommand';
import Socket from 'src/API/Socket';
import SocketContext from 'src/API/SocketContext';
import Login from 'src/modules/Login';
import Dashboard from 'src/modules/Dashboard';

interface IProps {
  socket: Socket;
}

interface ILoadingState {
  type: 'loading';
}

interface ILoggedInState {
  type: 'loggedIn';
  token: string;
}

interface ILoggingInState {
  type: 'loggingIn';
}

interface ILoggedOutState {
  type: 'loggedOut';
  error?: string;
}

type IState = ILoadingState | ILoggingInState | ILoggedInState | ILoggedOutState;

export default () => {
  const { socket } = React.useContext(SocketContext);
  const [state, setState] = React.useState<IState>({ type: 'loading' });

  const handleLogin = React.useCallback((report: ILoginReport) => {
    console.log('REPORT', report);
    switch(report.type) {
      case 'loggedIn':
        localStorage.setItem('token', report.token);
        return setState({ type: 'loggedIn', token: report.token });

      case 'failed':
        return setState({ type: 'loggedOut' });
        
      case 'exception':
        return setState({ type: 'loggedOut', error: 'Something went wrong while attempting to log you in - please try again' });
    }
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setState({ type: 'loggingIn' });
      socket.command<ILoginReport>(ReauthCommand(token))
        .then(handleLogin);

    } else {
      setState({ type: 'loggedOut' });
    }
  }, []);

  switch(state.type) {
    case 'loading':
      return null;
      
    case 'loggedIn':
      localStorage.setItem('token', state.token);
      return <Dashboard />;

    case 'loggingIn':
      return <div>Logging in...</div>;

    case 'loggedOut':
    const onLogin = (email: string, password: string) => {
      setState({ type: 'loggingIn' });
      socket.command(LoginCommand(email, password))
        .then(handleLogin);
    };

    return <Login onLogin={onLogin} error={'error' in state && state.error ? state.error : null} />;
  }
};
