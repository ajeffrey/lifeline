import * as React from 'react';
import Loader from 'src/modules/Loader';
import API from 'src/API';
import Protected from './Protected';
import * as S from './App.styled';
import SocketContext from 'src/API/SocketContext';

export default () => {
  return (
    <>
      <S.GlobalStyle />
      <Loader promise={API()}>
        {state => {
          switch(state.type) {
            case 'loading': return <div>Loading...</div>;
            case 'error': return <div>Error! {state.error.toString()}</div>;
            case 'ready': return (
              <SocketContext.Provider value={{ socket: state.data }}>
                <Protected />;
              </SocketContext.Provider>
            );
          }
        }}
      </Loader>
    </>
  );
};
