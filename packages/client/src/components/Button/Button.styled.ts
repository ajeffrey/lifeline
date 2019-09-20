import styled from 'styled-components';
import * as chroma from 'chroma-js';
import { row, raisedControl, inline } from 'src/mixins';
import { BUTTON_PRIMARY } from 'src/colors';

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

export const PrimaryButton = styled(Button)`
  color: white;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
  outline: none;
  position: relative;
  background: ${chroma.mix('black', BUTTON_PRIMARY, .8, 'lch').css()};
  border: 1px solid  ${chroma.mix('black', BUTTON_PRIMARY, .7, 'lch').css()};
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.75), 0 3px 5px rgba(0, 0, 0, .25), 0px 1px 2px rgba(0, 0, 0, 0.25);
  &:hover {
    background: ${chroma.mix('black', BUTTON_PRIMARY, .9, 'lch').css()}
  }
`;