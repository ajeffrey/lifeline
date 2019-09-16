import * as React from 'react';
import styled from 'styled-components';
import { ICard } from '@ll/shared/src/types';
import { HotKeys } from 'react-hotkeys';

interface IProps {
  card: ICard;
  selected: boolean;
  onFocus(): any;
  onDelete(): any;
  style?: any;
}

export default React.forwardRef(({ card, selected, onFocus, onDelete, style }: IProps, ref: React.Ref<HTMLDivElement>) => {
  const handleDelete = (e) => {
    e && e.preventDefault();
    e && e.stopPropagation();
    onDelete();
  }
  
  return (
    <HotKeys keyMap={{ DELETE: 'del' }} handlers={{ DELETE: handleDelete }} allowChanges>
      <Card ref={ref} tabIndex={0} key={card.id} selected={selected} onFocus={onFocus} style={style}>
        <Name selected={selected}>{card.name}</Name>
        <DeleteButton onClick={handleDelete}><i className="fal fa-fw fa-times" /></DeleteButton>
      </Card>
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

const Card = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  position: relative;
  border: 1px solid transparent;
  margin-left: 10px;
  ${({ selected }) => selected ? `
    // background: white;
    font-weight: 600;
    // border-color: #ddd;
  ` : ''}
  &:hover ${DeleteButton} {
    display: block;
  }
`;

const Name = styled.div<{ selected: boolean }>`
  flex-grow: 1;
  padding: 5px;
  ${({ selected }) => selected && 'font-weight: 600;'}
  cursor: pointer;
`;