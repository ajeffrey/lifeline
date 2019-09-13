import * as React from 'react';
import styled from 'styled-components';
import { Context } from 'src/modules/Provider';

export default () => {
  const { timebox, time } = React.useContext(Context);
  const remaining = timebox ? (timebox.end - time) : null;
  
  return remaining && remaining < 30 ?<Warning>{remaining} Minutes Remaining</Warning> : null;
};

export const Warning = styled.div`
  font-size: 16px;
  text-align: center;
  padding: 10px;
  background: rgba(255, 0, 0, 0.1);
  color: red;
  font-weight: 400;
`;
