import * as React from 'react';
import styled from 'styled-components';
import { ITask } from '@ll/shared/src/types';
import { HotKeys } from 'react-hotkeys';

interface IProps {
  task: ITask;
  selected: boolean;
  onFocus(): any;
  onDelete(): any;
  style?: any;
}

export default React.forwardRef(({ task, selected, onFocus, onDelete, style }: IProps, ref: React.Ref<HTMLDivElement>) => {
  const handleDelete = (e) => {
    e && e.preventDefault();
    e && e.stopPropagation();
    onDelete();
  }
  
  return (
    <HotKeys keyMap={{ DELETE: 'del' }} handlers={{ DELETE: handleDelete }} allowChanges>
      <Task ref={ref} tabIndex={0} key={task.id} selected={selected} onFocus={onFocus} style={style}>
        <Name selected={selected}>{task.name}</Name>
        <DeleteButton onClick={handleDelete}><i className="fal fa-fw fa-times" /></DeleteButton>
      </Task>
    </HotKeys>
  );
});

const DeleteButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  opacity: 0.25;
  display: none;
  padding: 0 5px;
  &:hover {
    opacity: 0.75;
  }
`;

const Task = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  position: relative;
  border: 1px solid transparent;
  ${({ selected }) => selected ? `
    // background: white;
    font-weight: 600;
    // border-color: #ddd;
    &:focus {
      // background: #fffff0;
      // border-color: #bbbb00;
    }
  ` : ''}
  &:hover ${DeleteButton} {
    display: block;
  }
`;

const Name = styled.div<{ selected: boolean }>`
  flex-grow: 1;
  padding: 5px 10px 5px 15px;
  ${({ selected }) => selected && 'font-weight: 600;'}
  cursor: pointer;
`;