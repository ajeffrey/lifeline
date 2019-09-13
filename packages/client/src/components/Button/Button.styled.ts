import styled from 'styled-components';
import * as chroma from 'chroma-js';
import { row, raisedControl, inline } from 'src/mixins';

export const Button = styled.button`
  box-sizing: content-box;
  ${row()}
  ${inline('2em')}
  cursor: pointer;
  font-family: inherit;
  align-items: baseline;
  font-weight: 400;
  padding: 0 1.5em;
  border-radius: 3px;
  border: none;
  background: none;
  -webkit-appearance: none;
  border-radius: 0;
`;

export const PushButton = styled(Button)<{ pressed?: boolean }>`
  ${({ pressed }) => pressed ? `
    background: #eaeaea;
    position: relative;
    z-index: 1;
    color: #333;
  ` : `
    background: #999;
    color: white;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
    &:hover {
      background: #aaa;
    }
  `}
`;

export const ButtonGroup = styled.div`
  ${raisedControl()}
  display: inline-flex;
  flex-direction: row;
  > * {
    margin-right: -1px;
  }
`;

export const DarkButton = styled(Button)<{ _color: chroma.Color }>`
  ${raisedControl()}
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25);
  color: white;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
  outline: none;
  position: relative;
  ${({ _color }) => {
    const light = chroma.mix('black', _color, .9, 'lch').css();
    const dark = chroma.mix('black', _color, .70, 'lch').css();
    const highlight = chroma.mix('black', _color, .6, 'lch').css();
    return `
    background: linear-gradient(to bottom, ${light}, ${light} 50%, ${dark} 50%, ${dark} 100%);
    border: 1px solid  ${highlight};
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.75), 0 2px 1px rgba(0, 0, 0, .25);
    &:hover {
      background: ${highlight}
    }
  `}}
`;
