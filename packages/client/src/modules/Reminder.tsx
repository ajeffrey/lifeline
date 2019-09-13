import * as React from 'react';
import styled from 'styled-components';

interface IProps {
  name: string;
  level?: [number, number];
}

export default ({ name, level }: IProps) => {
  return (
    <Reminder>
      <Name>{name}</Name>
      {level && <Meter num={level[0]} denom={level[1]} />}
    </Reminder>
  )
};

export const Reminders = styled.div`
  display: flex;
  flex-direction: row;
  display: none;
`;

const Reminder = styled.div`
  position: relative;
  background: white;
  flex-grow: 1;
  padding: 15px 5px;
  max-width: 300px;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

const Name = styled.div`
  font-weight: 400;
  font-size: 16px;
  text-align: center;
`;

const Meter = styled.div<{ num: number, denom: number }>`
  width: 10px;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 5px;
  width: ${({ num, denom }) => `${num / denom * 100}%`};
  background: green;
`;