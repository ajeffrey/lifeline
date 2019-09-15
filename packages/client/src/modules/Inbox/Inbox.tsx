import * as React from 'react';
import styled from 'styled-components';
import { GlobalHotKeys, HotKeys } from 'react-hotkeys';
import { InboxQuery, IInboxState } from '@ll/shared/src/queries/InboxQuery';
import { ITask } from '@ll/shared/src/types';
import NotificationContext from 'src/contexts/NotificationContext';
import useQuery from 'src/lib/useQuery';
import Task from './Task';
import { Transition, Spring, animated } from 'react-spring/renderprops';
import SocketContext from 'src/API/SocketContext';
import { DeleteTaskCommand, IDeleteTaskReport } from '@ll/shared/src/commands/DeleteTaskCommand';

const globalKeyMap = {
  GO_UP: 'up',
  GO_DOWN: 'down',
};

const keyMap = {
  GO_UP: 'up',
  GO_DOWN: 'down',
};

/**
 * Weird thing:
 * don't remove the HotKeys! They don't appear to be doing anything,
 * but without them - if you delete a task using del you can't immediately
 * delete the next task the same way. I have no idea why.
 */
export default React.memo(() => {
  const ref = React.useRef<HTMLDivElement>(null);
  const refMap = React.useMemo(() => new Map<string, HTMLDivElement>(), []);
  const tasks = useQuery<IInboxState>(InboxQuery(), []);
  const { socket } = React.useContext(SocketContext);
  const { success, error } = React.useContext(NotificationContext);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  if(!tasks) {
    return null;
  }

  const selected = tasks.find(task => task.id === selectedId) || null;

  const paneTransition = {
    native: true,
    unique: true,
    items: selected,
    from: { opacity: 0, right: '-10px' },
    enter: { opacity: 1, right: '0px' },
    leave: { opacity: 0, right: '-10px' },
  };

  const tasksTransition = {
    items: tasks,
    keys: task => task.id,
    from: { opacity: 0, left: '-20px', height: 'auto' },
    enter: { opacity: 1, left: '0px', height: 'auto' },
    leave: { opacity: 0, height: 0 },
  };

  const cursorSpring = {
    to: {
      opacity: selected ? 1 : 0,
      top: selected ? tasks.indexOf(selected) * 35 + 10 : 0,
    }
  };

  const getPreviousTask = (task: ITask) => {
    const index = tasks.indexOf(task);
    if(index > 0) {
      const task = tasks[index - 1];
      return task;
    }
    return null;
  }

  const getNextTask = (task: ITask) => {
    const index = tasks.indexOf(task);
    const nextTask = tasks[index + 1];
    return nextTask || null;
  }

  const selectTask = (task: ITask | null) => {
    if(task) {
      const node = refMap.get(task.id);
      if(node) {
        node.focus();
      }

    } else {
      document.body.focus();
    }
  }

  const onDelete = (task: ITask) => {
    socket.command<IDeleteTaskReport>(DeleteTaskCommand(task.id))
      .then(report => {
        switch(report.type) {
          case 'deleted': {
            if(selected === task) {
              const nextTask = getNextTask(selected) || getPreviousTask(selected);
              selectTask(nextTask);
            }
            return success('Task deleted');
          };
          case 'error':
            return error('Failed to delete task');
        }
      });
  }

  const hotKeyHandlers = {};

  const globalHandlers = {
    GO_UP: () => {
      console.log('UP');
      if(selected) {
        const previousTask = getPreviousTask(selected);
        if(previousTask) {
          selectTask(previousTask);
        }
      }
    },
    GO_DOWN: () => {
      console.log('GLOBAL');
      if(selected) {
        const nextTask = getNextTask(selected);
        if(nextTask) {
          selectTask(nextTask);
        }
      } else {
        selectTask(tasks[0]);
      }
    }
  };

  return (
    <Container>
      {tasks.length > 0 ? (
        <GlobalHotKeys keyMap={globalKeyMap} handlers={globalHandlers} allowChanges>
          <InboxPane>
            <Header>
              <Title>Inbox </Title>
              {tasks && tasks.length > 0 ? <Counter>{tasks.length}</Counter> : null}
            </Header>
            <HotKeys keyMap={keyMap} handlers={hotKeyHandlers} allowChanges>
              <TaskList ref={ref}>
                <Spring {...cursorSpring}>
                  {props => <Cursor style={props}><i className="fal fa-chevron-right" /></Cursor>}
                </Spring>
                <Mask>
                  <Transition {...tasksTransition}>
                    {task => props => (
                      <Task
                        ref={node => node && refMap.set(task.id, node)}
                        key={task.id}
                        task={task}
                        selected={task === selected}
                        onFocus={() => setSelectedId(task.id)}
                        onDelete={() => onDelete(task)}
                        style={props}
                        />
                    )}
                  </Transition>
                </Mask>
              </TaskList>
            </HotKeys>
          </InboxPane>
          <Transition {...paneTransition}>
            {selected => props => selected && (
              <ActionPane style={props}>
                <Title>{selected.name}</Title>
              </ActionPane>
            )}
          </Transition>
        </GlobalHotKeys>
      ) : (
        <Slate>
          <Fanfare className="far fa-fw fa-grin-beam" />
          <SlateText>All caught up!</SlateText>
        </Slate>
      )}
    </Container>
  );
});

const Container = styled.main`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  overflow: hidden;
`;

const InboxPane = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  min-width: 250px;
  max-width: 400px;
`;

const Slate = styled.div`
  flex-grow: 1;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Fanfare = styled.i`
  font-size: 130px;
  color: #ddd;
  margin-bottom: 40px;
`;

const SlateText = styled.p`
  font-size: 48px;
  font-weight: 500;
  color: #bbb;
`;

const ActionPane = animated(styled.div`
  flex-grow: 1;
  padding: 20px;
  position: relative;
  background: white;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.25), 0 2px 3px rgba(0, 0, 0, 0.25);
`);

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding: 10px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 400;
  flex-grow: 1;
`;

const Counter = styled.div`
  font-size: 24px;
  font-weight: 300;
  color: #999;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: relative;
`;

const Mask = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-x: hidden;
  padding: 10px;
`;

const Cursor = animated(styled.div`
  position: absolute;
  left: 10px;
  font-size: 12px;
  height: 35px;
  line-height: 35px;
`);