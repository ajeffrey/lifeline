import * as React from 'react';
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

const fill = (n: number, current: number) => {
  if(n < current) {
    return 'green';
    
  } else if(n === current) {
    return THEME_PRIMARY.css();

  } else {
    return 'white';
  }
}

export default function Progress({ steps, current }: IProps) {
  const width = (LINE_LENGTH + CIRCLE_DIAMETER) * steps - LINE_LENGTH;
  const height = CIRCLE_DIAMETER;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      {range(1, steps + 1).map(n => {
        const circleCenter = (CIRCLE_DIAMETER + LINE_LENGTH) * n - LINE_LENGTH - CIRCLE_RADIUS;
        const circleEnd = circleCenter + CIRCLE_RADIUS
        return (
          <>
            <circle cx={circleCenter} cy={height / 2} r={CIRCLE_RADIUS} fill={fill(n - 1, current)} stroke="#ddd" />
            {n < steps && <line x1={circleEnd + LINE_GAP} y1={height / 2} x2={circleEnd + LINE_LENGTH - LINE_GAP} y2={height / 2} stroke="#ddd" strokeWidth={2} />}
          </>
        );
      })}
    </svg>
  )
}