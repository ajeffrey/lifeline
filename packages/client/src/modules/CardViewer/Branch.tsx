import * as React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { THEME_PRIMARY } from 'src/colors';

interface IProps {
  icon: string;
  title: string;
  description: string;
  onClick(): any;
  selected: boolean;
}

export default ({ icon, title, description, onClick, selected }: IProps) => {
  const spring = useSpring({
    opacity: selected ? 1 : 0.25,
  });

  return (
    <Branch onClick={onClick} style={spring}>
      <Icon className={`fa-fw ${icon}`} />
      <Content>
        <Name>{title}</Name>
        <Description>{description}</Description>
      </Content>
    </Branch>
  )
}

const Branch = animated(styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  // margin: 0 10px;
  border-radius: 5px;
  color: ${THEME_PRIMARY.css()};

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`);

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 15px 10px 5px;
`;

const Name = styled.div`
  display: block;
  font-weight: normal;
  color: #333;
`;

const Icon = styled.i`
  font-size: 36px;
  padding: 5px;
`;

const Description = styled.p`
  font-style: italic;
  font-size: 14px;
  color: #999;
`;