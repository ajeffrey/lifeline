import * as React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

export default () => {
  const now = new Date(); // doesn't update!
  const seconds = now.getSeconds() / 60 * 100;

  return (
    <Clock>
      {format(now, 'HH:mm')}
      <SecondsProgress percent={seconds} />
    </Clock>
  );
};

const Clock = styled.div`
  position: relative;
  font-size: 16px;
  padding: 0 10px 0 13px;
  align-self: stretch;
  line-height: 40px;
  background: rgba(0, 0, 0, 0.25);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
`;

const SecondsProgress = styled.div<{ percent: number }>`
position: absolute;
  background: green;
  width: 3px;
  bottom: 0;
  left: 0;
  height: ${({ percent }) => percent}%;
`;
