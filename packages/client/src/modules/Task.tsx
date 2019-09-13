import * as React from 'react';
import styled from 'styled-components';
import * as chroma from 'chroma-js';
import { elevation } from 'src/mixins';

interface IProps {
  title: string;
}

export default ({ title }: IProps) => {
  return (
    <Task>
      <Header>
        <Title>{title}</Title>
        <Actions>
          <Icon bgColor={chroma.lch(70, 45, 150)}><i className="fa fa-check" /></Icon>
          <Icon bgColor={chroma.lch(70, 0, 0)}><i className="fa fa-arrow-right" /></Icon>
        </Actions>
      </Header>
    </Task>
  );
}

const Task = styled.div`
  background: white;
  ${elevation(4)}
  flex-grow: 1;
  margin: 20px 20px 0;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
`;

const Title = styled.div`
  font-weight: 400;
  font-size: 28px;
  padding-bottom: 15px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
`;

const Icon = styled.div<{ bgColor: chroma.Color }>`
  width: 35px;
  height: 35px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 1);
  border-radius: 100%;
  text-align: center;
  line-height: 35px;
  color: white;
  background: ${({ bgColor }) => bgColor.css()};
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
  font-size: 1.125em;
  margin-right: 5px;
`;