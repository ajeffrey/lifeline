import * as React from 'react';
import styled from 'styled-components';
import { IAnyCard } from '@ll/shared/src/types';
import { animated } from 'react-spring/renderprops';
import { Title, Header } from 'src/styles';
import Branch from './Branch';
import TaskForm from './TaskForm';

interface IProps {
  card: IAnyCard;
  style?: any;
}

interface ICardOption<T> {
  key: T;
  icon: string;
  title: string;
  description: string;
}

const kinds: ICardOption<IAnyCard['kind']>[] = [
  { key: 'task', icon: 'fal fa-check-circle', title: 'Task', description: 'A one-time task to do' },
  { key: 'event', icon: 'fal fa-calendar-day', title: 'Event', description: 'A calendar event'},
  { key: 'habit', icon: 'fal fa-repeat', title: 'Habit', description: 'A recurring task' },
];

export default React.forwardRef(({ card, style }: IProps, ref: React.Ref<HTMLDivElement>) => {
  const [state, setState] = React.useState<IAnyCard>(card);

  const setKind = (kind: IAnyCard['kind']) => {
    const { id, creatorId, name } = card;
    const rest = { id, creatorId, name, kind };

    switch(kind) {
      case 'task':
        return setState({ subtasks: [], ...rest});
      default:
        return setState({ ...rest, kind });
    }
  };

  return (
    <CardViewer style={style} ref={ref}>
      <Header>
        <Title>{card.name}</Title>
      </Header>
      {(() => {
        switch(state.kind) {
          case 'pending':
            return (
              <>
                <Question>What type of card is this?</Question>
                <Branches>
                  {kinds.map(({ key, icon, title, description }) => (
                    <Branch key={key} icon={icon} title={title} description={description} onClick={() => setKind(key)} selected={state.kind === key} />
                  ))}
                </Branches>
              </>
            );
          case 'task':
            return (
              <TaskForm task={state} onChange={setState} />
            );
        }
      })()}
    </CardViewer>
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
  align-self: flex-start;
`;

const SubTasks = styled.div`
  border-left: 2px solid #333;
  padding-left: 10px;
`;