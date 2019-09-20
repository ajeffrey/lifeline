import * as React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { THEME_PRIMARY } from 'src/colors';
import { PrimaryButton } from 'src/components/Button';

interface IProps {
  icon: string;
  title: string;
  description: string;
  onClick(): any;
  selected: boolean;
}

export default ({ icon, title, description, onClick, selected }: IProps) => {
  const [hovered, setHovered] = React.useState<boolean>(false);
  const spring = useSpring({
    opacity: selected || hovered ? 1 : 0.25,
  });

  return (
    <Branch onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Icon className={`fa-fw ${icon}`} style={spring} />
      <Content>
        <Name style={{ fontWeight: selected ? 600 : 400 }}>{title}</Name>
        <Description>{description}</Description>
      </Content>
    </Branch>
  )
}

const Branch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  color: ${THEME_PRIMARY.css()};

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const Content = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 10px 25px 10px 5px;
  flex-grow: 1;
  width: 200px;
`;

const Name = styled.div`
  display: block;
  font-weight: normal;
  color: #333;
`;

const Icon = animated(styled.i`
  font-size: 36px;
  padding: 5px;
`);

const Description = styled.p`
  font-style: italic;
  font-size: 14px;
  color: #999;
`;