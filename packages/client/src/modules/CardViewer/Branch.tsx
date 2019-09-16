import * as React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { THEME_PRIMARY } from 'src/colors';

interface IProps {
  icon: string;
  title: string;
  onClick(): any;
  selected: boolean;
}

export default ({ icon, title, onClick, selected }: IProps) => {
  const spring = useSpring({
    opacity: selected ? 1 : 0.25,
    background: selected ? '#fff' : '#f6f6f6',
  });

  return (
    <Branch onClick={onClick} style={spring} tabIndex={0}>
      <Icon className={`fa-fw ${icon}`} />
      <Name>{title}</Name>
    </Branch>
  )
}

const Branch = animated(styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  padding: 20px;
  border-radius: 5px;
  color: ${THEME_PRIMARY.css()};

  border: 2px solid #ddd;

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`);

const Name = styled.div`
  display: block;
  margin-top: 10px;
`;

const Icon = styled.i`
  font-size: 36px;
`;