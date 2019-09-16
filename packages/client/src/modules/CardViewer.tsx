import * as React from 'react';
import styled from 'styled-components';
import { ICard } from '@ll/shared/src/types';
import { Transition, animated } from 'react-spring/renderprops';
import { Title, Header } from 'src/styles';

interface IProps {
  card: ICard | null;
}

export default ({ card }: IProps) => {
  const paneTransition = {
    native: true,
    unique: true,
    items: card,
    from: { opacity: 0, right: '-10px' },
    enter: { opacity: 1, right: '0px' },
    leave: { opacity: 0, right: '-10px' },
  };

  return (
    <Transition {...paneTransition}>
      {card => props => card && (
        <CardViewer style={props}>
          <Header>
            <Title>{card.name}</Title>
          </Header>
          <Question>What type of card is this?</Question>
        </CardViewer>
      )}
    </Transition>
  );
}

const CardViewer = animated(styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
  background: white;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.25), 0 2px 3px rgba(0, 0, 0, 0.25);
`);

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Question = styled.div`
  font-weight: bold;
`;

const Branches 

const Branch = styled.div`

`;