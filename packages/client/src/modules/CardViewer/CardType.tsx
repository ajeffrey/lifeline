import * as React from 'react';
import styled from 'styled-components';
import Branch from './Branch';
import { HotKeys } from 'react-hotkeys';
import { IAnyCard } from '@ll/shared/src/types';

interface IProps {
  value: IAnyCard['kind'];
  onChange(kind: IAnyCard['kind']): any;
}

interface ICardOption {
  key: IAnyCard['kind'];
  icon: string;
  title: string;
  description: string;
}

const keyMap = {
  SELECT_PREVIOUS: 'up',
  SELECT_NEXT: 'down',
};

export default ({ value, onChange }: IProps) => {
  const options: ICardOption[] = [
    { key: 'pending', icon: 'fal fa-seedling', title: 'Pending', description: 'Not yet categorised' },
    { key: 'task', icon: 'fal fa-check-circle', title: 'Task', description: 'A one-time task to do' },
    { key: 'event', icon: 'fal fa-calendar-day', title: 'Event', description: 'A calendar event'},
    { key: 'habit', icon: 'fal fa-repeat', title: 'Habit', description: 'A recurring task' },
  ];

  const selectedIndex = options.findIndex(option => option.key === value);

  const keyHandlers = {
    SELECT_PREVIOUS: () => {
      if(selectedIndex > 0) {
        onChange(options[selectedIndex - 1].key);
      }
    },
    SELECT_NEXT: () => {
      if(selectedIndex < (options.length - 1)) {
        if(selectedIndex >= 0) {
          onChange(options[selectedIndex + 1].key);
        } else {
          onChange(options[0].key);
        }
      }
    }
  };
  
  return (
    <HotKeys keyMap={keyMap} handlers={keyHandlers} allowChanges>
      <Branches tabIndex={0}>
        {options.map(({ key, icon, title, description }) => (
          <Branch key={key} icon={icon} title={title} description={description} onClick={() => onChange(key)} selected={value === key} />
        ))}
      </Branches>
    </HotKeys>
  );
};

const Branches = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
