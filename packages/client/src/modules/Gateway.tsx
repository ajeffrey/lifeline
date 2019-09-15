import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Header from 'src/modules/Header';
import QuickAdd from './QuickAdd';
import Notifications from './Notifications';
import Inbox from './Inbox';

export default () => {
  return (
    <BrowserRouter>
      <App>
        <Notifications>
          <Header />
          <Frame>
            <Container>
              <Switch>
                <Route exact path="/inbox" component={Inbox} />
                <Redirect to="/inbox" />
              </Switch>
            </Container>
            <QuickAdd />
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
  flex-direction: column;
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  width: 100%;
`;