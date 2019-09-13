import styled from 'styled-components';
import { inline } from 'src/mixins';

export const Input = styled.input`
  ${inline('30px')}
  padding: 0 6px;
  flex-grow: 1;
  align-self: stretch;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
  font-weight: 300;
  background: transparent;
  border: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
