import * as React from 'react';
import * as chroma from 'chroma-js';
import styled from 'styled-components';
import { range } from 'lodash';
import Window from './Window';
import { Context } from '../Provider';
import { ITimeBoxView } from '@ll/shared/src/types';

interface IState {
  locked: boolean;
}

export default () => {
  const { time, timeboxes } = React.useContext(Context);
  const [{ locked }, setState] = React.useState<IState>({ locked: true });
  const ref = React.createRef<HTMLDivElement>();

  const toggleLock = () => setState({ locked: !locked });
  
  React.useEffect(() => {
    ref.current && ref.current.scrollTo({ top: time / 60 * 100 });
  }, [time]);

  return (
    <Timeline scroll={!locked} className="timeline" ref={ref}>
      <LockButton onClick={toggleLock}><i className={`fa fa-fw fa-${locked ? 'lock' : 'unlock'}`} /></LockButton>
      <Shuttle now={locked ? time : null} className="shuttle">
        {range(0, 24).map(hour => (
          <Window key={hour} time={hour * 60} />
        ))}
        {timeboxes.map(timebox => (
          <Timebox timebox={timebox} key={timebox.start} />
        ))}
        {locked ? null : <Marker now={time} />}
      </Shuttle>
    </Timeline>
  );
};

const Timeline = styled.div`
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
  max-width: 200px;
  max-height: 100%;
  border-left: 1px solid #aaa;
  width: 100%;
  padding: 0 5px;
  background: #eee;
`;

const Shuttle = styled.div<{ now: number | null }>`
  position: relative;
  background: #fff;
  ${({ now }) => now ?
    `margin-top: -${now / 60 * 100}px;` :
    `overflow-y: auto;
    max-height: 100%;`
  }
`;

const LockButton = styled.div`
  position: absolute;
  z-index: 3;
  right: 100%;
  top: 0;
  padding: 5px;
  background: #eee;
  border-left: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
`;

const Marker = styled.div<{ now: number }>`
  width: 100%;
  height: 1px;
  background: red;
  position: absolute;
  z-index: 3;
  left: 0;
  top: ${({ now }) => `${now / 60 * 100}px`};
`;

const Timebox = styled.div<{ timebox: ITimeBoxView }>`
  position: absolute;
  top: ${({ timebox }) => `${timebox.start / 60 * 100}px`};
  left: 0;
  width: 100%;
  height: ${({ timebox }) => `${(timebox.end - timebox.start) / 60 * 100}px`};
  background: ${({ timebox }) => chroma.lch(...timebox.context.colour).css()};
`;