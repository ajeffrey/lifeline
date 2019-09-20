import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { GlobalHotKeys } from 'react-hotkeys';
import styled from 'styled-components';
import Menu from 'src/modules/Menu';
import QuickAdd from './QuickAdd';
import Notifications from './Notifications';
import Inbox from './Inbox';

const globalKeyMap = {
  QUICK_ADD: 'q',
};

export default () => {
  const [isOpen, setOpen] = React.useState<boolean>(false);

  const globalHandlers = {
    QUICK_ADD: (event) => {
      event.preventDefault();
      setOpen(true);
    },
  };

  return (
    <BrowserRouter>
        <App>
          <Notifications>
            <Menu />
            <Frame>
              <GlobalHotKeys keyMap={globalKeyMap} handlers={globalHandlers}>
              <Container>
                <Switch>
                  <Route exact path="/inbox" component={Inbox} />
                  <Redirect to="/inbox" />
                </Switch>
              </Container>
              </GlobalHotKeys>
              <QuickAdd isOpen={isOpen} onClose={() => setOpen(false)} />
            </Frame>
          </Notifications>
        </App>
    </BrowserRouter>
  );
};

export const App = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  overflow: hidden;
`;

export const Frame = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  overflow: hidden;
`;

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  width: 100%;
`;
