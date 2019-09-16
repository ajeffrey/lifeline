import * as React from 'react';
import styled from 'styled-components';
import { ICard } from '@ll/shared/src/types';
import { Transition, animated } from 'react-spring/renderprops';
import { Title, Header } from 'src/styles';
import Branch from './Branch';
import Progress from './Progress';

interface IProps {
  card: ICard | null;
}

export default React.forwardRef(({ card }: IProps, ref: React.Ref<HTMLDivElement>) => {
  const [selected, setSelected] = React.useState<string | null>(null);
  
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
            <Progress steps={3} current={0} />
          </Header>
          <Question>What type of card is this?</Question>
          <Branches>
            <Branch icon="fal fa-check-circle" title="Task" onClick={() => setSelected('task')} selected={selected === 'task'} />
            <Branch icon="fal fa-calendar-day" title="Event" onClick={() => setSelected('event')} selected={selected === 'event'} />
          </Branches>
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
  flex-direction: row;
`;
