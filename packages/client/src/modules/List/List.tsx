import * as React from 'react';
import styled from 'styled-components';
import { GlobalHotKeys, HotKeys } from 'react-hotkeys';
import { IAnyCard } from '@ll/shared/src/types';
import NotificationContext from 'src/contexts/NotificationContext';
import Card from './Card';
import { Transition, Spring, animated } from 'react-spring/renderprops';
import SocketContext from 'src/API/SocketContext';
import { DeleteCardCommand, IDeleteCardReport } from '@ll/shared/src/commands/DeleteCardCommand';

interface IProps {
  cards: IAnyCard[];
  selected: IAnyCard | null;
  onSelect(card: IAnyCard | null): any;
}

const globalKeyMap = {
  GO_DOWN: 'down',
};

const keyMap = {
  GO_UP: 'up',
  GO_DOWN: 'down',
  SWITCH: 'tab',
};

export default React.memo(({ cards, selected, onSelect }: IProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const refMap = React.useMemo(() => new Map<string, HTMLDivElement>(), []);
  const { socket } = React.useContext(SocketContext);
  const { success, error } = React.useContext(NotificationContext);

  const cardsTransition = {
    items: cards,
    keys: card => card.id,
    from: { opacity: 0, left: '-20px', height: 'auto' },
    enter: { opacity: 1, left: '0px', height: 'auto' },
    leave: { opacity: 0, height: 0 },
  };

  const cursorSpring = {
    to: {
      opacity: selected ? 1 : 0,
      top: selected ? cards.indexOf(selected) * 33 + 10 : 0,
    }
  };

  const getPreviousCard = (card: IAnyCard) => {
    const index = cards.indexOf(card);
    if(index > 0) {
      const card = cards[index - 1];
      return card;
    }
    return null;
  }

  const getNextCard = (card: IAnyCard) => {
    const index = cards.indexOf(card);
    const nextCard = cards[index + 1];
    return nextCard || null;
  }

  const selectCard = (card: IAnyCard | null) => {
    if(card) {
      const node = refMap.get(card.id);
      if(node) {
        node.focus();
      }

    } else {
      document.body.focus();
    }
  }

  const onDelete = (card: IAnyCard) => {
    socket.command<IDeleteCardReport>(DeleteCardCommand(card.id))
      .then(report => {
        switch(report.type) {
          case 'deleted': {
            if(selected === card) {
              const nextCard = getNextCard(selected) || getPreviousCard(selected);
              selectCard(nextCard);
            }
            return success('Card deleted');
          };
          case 'error':
            return error('Failed to delete card');
        }
      });
  }

  const hotKeyHandlers = {
    GO_UP: () => {
      console.log('UP');
      if(selected) {
        const previousCard = getPreviousCard(selected);
        console.log('previous = ', previousCard);
        if(previousCard) {
          return selectCard(previousCard);
        }
      }

      selectCard(selected);
    },
    GO_DOWN: () => {
      console.log('DOWN');
      if(selected) {
        const nextCard = getNextCard(selected);
        if(nextCard) {
          selectCard(nextCard);
        }
      }
    },
    SWITCH: () => {

    }
  };

  const globalHandlers = {
    GO_DOWN: () => {
      console.log('GLOBAL');
      if(!selected) {
        selectCard(cards[0]);
      }
    }
  };

  return (
    <GlobalHotKeys keyMap={globalKeyMap} handlers={globalHandlers} allowChanges root>
      <HotKeys keyMap={keyMap} handlers={hotKeyHandlers} allowChanges>
        <CardList ref={ref}>
          <Spring {...cursorSpring}>
            {props => <Cursor style={props}><i className="fal fa-chevron-right" /></Cursor>}
          </Spring>
          <Mask>
            <Transition {...cardsTransition}>
              {card => props => (
                <Card
                  ref={node => node && refMap.set(card.id, node) && selected === card && node.focus()}
                  key={card.id}
                  card={card}
                  selected={card === selected}
                  onFocus={() => onSelect(card)}
                  onDelete={() => onDelete(card)}
                  style={props}
                  />
              )}
            </Transition>
          </Mask>
        </CardList>
      </HotKeys>
   </GlobalHotKeys>
  );
});

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: relative;
  margin: -10px;
`;

const Mask = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-x: hidden;
  padding: 10px;
`;

const Cursor = animated(styled.div`
  position: absolute;
  left: 10px;
  font-size: 12px;
  height: 35px;
  line-height: 35px;
`);