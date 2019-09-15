import * as React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import * as chroma from 'chroma-js';

export default () => {
  return (
    <Header>
      <Category to="/inbox" activeClassName="active"><i className="fa fa-fw fa-inbox" /></Category>
      <Category to="/today"><i className="fa fa-fw fa-calendar-day" /></Category>
      <Expanse />
      <Logo><i className="far fa-fw fa-heart-rate" /></Logo>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 50px;
  background: ${chroma.mix(chroma.lch(55, 35, 245), 'black', .1).css()};
  color: white;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 20px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  line-height: 50px;
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.25);
  text-align: center;
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(0, 0, 0, 0.5);
`;

const Category = styled(NavLink)`
  line-height: 50px;
  width: 50px;
  height: 50px;
  text-align: center;
  color: ${chroma.mix(chroma.lch(55, 35, 245), 'white', .35).css()};
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  &:hover {
    color: white;
  }
  &.active {
    color: white;
    background: rgba(0, 0, 0, 0.25);
  }
`;

const Expanse = styled.div`
  flex-grow: 1;
`;

