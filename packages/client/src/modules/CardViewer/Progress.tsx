import * as React from 'react';
import styled from 'styled-components';
import { range } from 'lodash';
import { THEME_PRIMARY } from 'src/colors';

interface IProps {
  steps: number;
  current: number;
}

const LINE_LENGTH = 50;
const CIRCLE_RADIUS = 10;
const CIRCLE_DIAMETER = CIRCLE_RADIUS * 2;
const LINE_GAP = 5;

const style = (n: number, current: number, radius: number) => {
  if(n < current) {
    return { r: radius, fill: 'green' };
    
  } else if(n === current) {
    return { r: radius, fill: THEME_PRIMARY.css() };

  } else {
    return { r: radius - 1, fill: 'white', stroke: '#ddd' };
  }
}

export default ({ steps, current }: IProps) => {
  const width = (LINE_LENGTH + CIRCLE_DIAMETER) * steps - LINE_LENGTH;
  const height = CIRCLE_DIAMETER;
  return (
    <Progress>
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        {range(1, steps + 1).map(n => {
          const circleCenter = (CIRCLE_DIAMETER + LINE_LENGTH) * n - LINE_LENGTH - CIRCLE_RADIUS;
          const circleEnd = circleCenter + CIRCLE_RADIUS
          return (
            <g key={n}>
              <circle cx={circleCenter} cy={height / 2} {...style(n - 1, current, CIRCLE_RADIUS)} />
              {n < steps && <line x1={circleEnd + LINE_GAP} y1={height / 2} x2={circleEnd + LINE_LENGTH - LINE_GAP} y2={height / 2} stroke="#ddd" strokeWidth={2} />}
            </g>
          );
        })}
      </svg>
    </Progress>
  );
}

const Progress = styled.div`
  padding: 5px 0 20px;
`;