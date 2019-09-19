import styled from 'styled-components';
import * as chroma from 'chroma-js';
import { Input as BaseInput } from 'src/components/Input';
import { inline } from 'src/mixins';
import { Button } from 'src/components/Button';

export const Layout = styled.div`
  flex-grow: 1;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  display: block;
  max-width: 100%;
  width: 300px;
  padding: 20px;
  font-size: 16px;
`;

export const Error = styled.div`
  border: 1px solid red;
  padding: 10px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  &:first-child {
    margin-top: 0;
  }
`;

export const Actions = styled.div`
  margin-top: 15px;
`;

export const Label = styled.div`
  font-weight: 600;
`;

export const Input = styled(BaseInput)`
  ${inline('40px')}
  border: 1px solid #999;
  padding: 0 10px;
  margin-top: 5px;
  font-size: 15px;
  box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.25);
`;

export const LoginButton = styled(Button)<{ _color: chroma.Color }>`
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25);
  color: white;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
  outline: none;
  position: relative;
  ${({ _color }) => {
    const fore = chroma.mix('black', _color, .8, 'lch').css();
    const highlight = chroma.mix('black', _color, .7, 'lch').css();
    return `
    background: ${fore};
    border: 1px solid  ${highlight};
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.75), 0 1px 2px rgba(0, 0, 0, .5);
    &:hover {
      background: ${highlight}
    }
  `}}
`;
