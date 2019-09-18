import * as React from 'react';
import styled from 'styled-components';
import { IAnyCard, ICard } from '@ll/shared/src/types';
import { Transition, animated } from 'react-spring/renderprops';
import { Title, Header } from 'src/styles';
import Progress from './Progress';
import CardType from './CardType';

interface IProps {
  card: IAnyCard;
}

export default React.forwardRef(({ card }: IProps, ref: React.Ref<HTMLDivElement>) => {
  const [state, setState] = React.useState<Partial<IAnyCard> & ICard>(card);

  const setKind = (kind: IAnyCard['kind']) => {
    switch(kind) {
      case 'task':
        return setState(({ id, creatorId, name }) => ({ id, creatorId, name, kind: 'task' }));
      case 'pending':
        return setState(({ id, creatorId, name }) => ({ id, creatorId, name, kind: 'pending' }));
      case 'event':
        return setState(({ id, creatorId, name }) => ({ id, creatorId, name, kind: 'event' }));
    }
  }
  
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
        <CardViewer style={props} ref={ref}>
          <Header>
            <Title>{card.name}</Title>
          </Header>
          <Progress steps={3} current={0} />
          <Question>What type of card is this?</Question>
          <CardType value={state.kind} onChange={kind => setKind(kind)} />
        </CardViewer>
      )}
    </Transition>
  );
});

const CardViewer = animated(styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
  background: white;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.25), 0 2px 3px rgba(0, 0, 0, 0.25);
`);

const Question = styled.div`
  padding: 5px 0 10px;
`;

const Branches = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
