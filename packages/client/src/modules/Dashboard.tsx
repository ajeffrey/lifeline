import * as React from 'react';
import styled from 'styled-components';
import * as chroma from 'chroma-js';
import Provider from 'src/modules/Provider';
import Header from 'src/modules/Header';

export default () => {
  return (
    <App>
      <Provider>
        <Header />
        <Frame>
          <Container>
          </Container>
        </Frame>
      </Provider>
    </App>
  );
};

export const App = styled.div`
  display: flex;
  flex-direction: column;
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
  background: ${chroma.lch(100, 5, 180).css()};
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  width: 100%;
`;