import * as React from 'react';
import styled from 'styled-components';
import { InboxQuery, IInboxState } from '@ll/shared/src/queries/InboxQuery';
import { Transition } from 'react-spring/renderprops';
import useQuery from 'src/lib/useQuery';
import List from '../List';
import { IAnyCard } from '@ll/shared/src/types';
import { Title, Header } from 'src/styles';
import CardViewer from '../CardViewer';

export default React.memo(() => {
  const cards = useQuery<IInboxState>(InboxQuery(), []);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  if(!cards) {
    return null;
  }
  
  console.log('CARDS', cards);

  const setSelected = (card: IAnyCard | null) => {
    setSelectedId(card ? card.id : null);
  }

  const selected = cards.find(card => card.id === selectedId) || null;

  if(cards.length === 0) {
    return (
      <Slate>
        <Fanfare className="far fa-fw fa-grin-beam" />
        <SlateText>All caught up!</SlateText>
      </Slate>
    );
  }

  return (
    <>
      <InboxPane>
        <Header>
          <Title>Inbox</Title>
          <Counter>{cards.length}</Counter>
        </Header>
        <List cards={cards} selected={selected} onSelect={setSelected} />
      </InboxPane>
      <Transition native unique items={selected} from={{ opacity: 0, right: '-10px' }} enter={{ opacity: 1, right: '0px' }} leave={{ opacity: 0, right: '-10px' }}>
      {selected => props => selected && <CardViewer card={selected} style={props} />}
      </Transition>
    </>
  );
});

const InboxPane = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-width: 250px;
  max-width: 400px;
`;

const Slate = styled.div`
  flex-grow: 1;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Fanfare = styled.i`
  font-size: 130px;
  color: #ddd;
  margin-bottom: 40px;
`;

const SlateText = styled.p`
  font-size: 48px;
  font-weight: 500;
  color: #bbb;
`;

const Counter = styled.div`
  font-size: 24px;
  font-weight: 300;
  color: #999;
`;
