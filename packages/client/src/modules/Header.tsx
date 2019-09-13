import * as React from 'react';
import styled from 'styled-components';
import * as chroma from 'chroma-js';
import { format } from 'date-fns';
import { Context } from 'src/modules/Provider';

export default () => {
  const context = React.useContext(Context);
  const { now, timebox } = context;

  return (
    <Header background={timebox ? chroma.lch(...timebox.context.colour) : undefined}>
      <ContextTitle>lifeline</ContextTitle>
      <Clock>{format(now, 'HH:mm:ss')}</Clock>
    </Header>
  );
};

const darken = (colour: chroma.Color) => colour.set('lch.l', colour.get('lch.l') - 10).css();
const lighten = (colour: chroma.Color) => colour.set('lch.l', colour.get('lch.l') + 10).css();


export const Header = styled.div<{ background?: chroma.Color }>`
  display: flex;
  flex-direction: row;
  height: 40px;
  background: ${({ background }) => background ? `linear-gradient(to right, ${darken(background)}, ${lighten(background)})` : '#333'};
  color: white;
  align-items: center;
`;

export const Clock = styled.div`
  font-size: 16px;
  padding: 0 10px;
  align-self: stretch;
  line-height: 40px;
  background: rgba(0, 0, 0, 0.25);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  margin-left: 15px;
`;

export const ContextTitle = styled.div`
  font-size: 16px;
  font-weight: normal;
  flex-grow: 1;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  padding-left: 10px;
`;
