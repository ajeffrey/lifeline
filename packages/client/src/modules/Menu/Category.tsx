import * as React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router';
import * as chroma from 'chroma-js';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

interface IProps {
  url: string;
  icon: string;
  label: string;
  count?: number;
  expanded: boolean;
}

export default withRouter(({ location, url, icon, label, count, expanded }: IProps & RouteComponentProps) => {
  const active = location.pathname === url;
  const spring = useSpring({ opacity: expanded ? 1 : 0 });

  return (
    <Category to={url}>
      <Icon active={active} className={icon}>
      </Icon>
      <Label>
        <Text active={active} style={spring}>{label}</Text>
        {count && <Count>{count}</Count>}
      </Label>
    </Category>
  );
});

const Category = styled(Link)`
  display: flex;
  flex-direction: row;
  text-decoration: none;
`;

const Icon = styled.div<{ active: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  line-height: 50px;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  color: ${chroma.mix(chroma.lch(55, 35, 245), 'white', .35).css()};
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid transparent;
  &:hover {
    color: white;
  }
  ${({ active }) => active && `
    color: white;
    background: rgba(0, 0, 0, 0.25);
  `}
`;

const Label = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  padding: 0 15px;
  border-bottom: 1px solid #f6f6f6;
`;

const Text = animated(styled.div<{ active: boolean }>`
  background: white;
  line-height: 50px;
  flex-grow: 1;
  color: rgba(51, 51, 51, 0.5);
  ${({ active }) => active && `
    font-weight: 600;
    color: #333;
  `}
`);

const Count = styled.div`
  color: #999;
`;