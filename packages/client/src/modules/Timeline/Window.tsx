import * as React from 'react';
import styled from 'styled-components';
import { formatTime } from 'src/lib/time';

interface IProps {
  time: number;
}

export default ({ time }: IProps) => {
  return (
    <Window>
      <Label>{formatTime(time)}</Label>
    </Window>
  );
};

const Window = styled.div`
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  height: 100px;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  &:first-of-type {
    border-top: none;
  }
`;

const Label = styled.div`
  padding: 5px 10px;
  font-size: 12px;
`;