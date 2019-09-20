import * as React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import * as chroma from 'chroma-js';
import { useSpring, animated } from 'react-spring';
import { THEME_PRIMARY } from 'src/colors';
import Category from './Category';

export default withRouter(({ match }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const toggleExpanded = () => setExpanded(!expanded);

  const { transform, width } = useSpring({
    width: expanded ? '250px' : '50px',
    transform: `perspective(600px) rotateY(${expanded ? 180 : 0}deg)`,
  });

  return (
    <>
      <Menu style={{ width }}>
        <Category label="Inbox" icon="fa fa-inbox" url="/inbox" count={10} expanded={expanded} />
        <Category label="Todo" icon="far fa-check" url="/todo" expanded={expanded} />
        <Category label="Today" icon="fa fa-calendar-day" url="/today" expanded={expanded} />
        <Expanse />
        <Toggle><ToggleIcon className={`far fa-chevron-left`} onClick={toggleExpanded} style={{ transform }} /></Toggle>
      </Menu>
    </>
  );
});

const Menu = animated(styled.div`
  display: flex;
  flex-direction: column;
  background: ${THEME_PRIMARY.css()};
  color: white;
  overflow: hidden;
  background: linear-gradient(to right, ${THEME_PRIMARY.css()} 0px, ${THEME_PRIMARY.css()} 50px, white 50px, white 100%);
`);

const Toggle = styled.div`
  width: 50px;
  height: 50px;
`;

const ToggleIcon = animated(styled.div`
  width: 30px;
  height: 30px;
  margin: 10px;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  line-height: 30px;
  text-align: center;
  border-radius: 100%;
  color: #666;
  will-change: transform;
  font-size: 12px;
`);

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

const Expanse = styled.div`
  flex-grow: 1;
`;

