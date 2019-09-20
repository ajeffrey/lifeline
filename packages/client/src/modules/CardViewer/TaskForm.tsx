import * as React from 'react';
import styled from 'styled-components';
import { ITask } from '@ll/shared/src/types';
import { Input } from 'src/components/Input';

interface IProps {
  task: ITask;
}

export default ({ task }: IProps) => {

  return (
    <>
      <Question>Subtasks</Question> 
      <SubTasks>
        <Input />
      </SubTasks>
    </>
  );

};

const Question = styled.div`
  padding: 5px 0 10px;
`;

const SubTasks = styled.div`
  border-left: 2px solid #ddd;
  padding-left: 10px;
`;