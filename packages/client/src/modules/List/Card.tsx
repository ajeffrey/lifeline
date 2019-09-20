import * as React from 'react';
import styled from 'styled-components';
import { IAnyCard } from '@ll/shared/src/types';
import { HotKeys } from 'react-hotkeys';
import { Input as BaseInput } from 'src/components/Input';

interface IProps {
  card: IAnyCard;
  selected: boolean;
  onClick(): any;
  style?: any;
}

interface IEditingState {
  type: 'editing';
  name: string;
}

interface IReadState {
  type: 'read';
}

type IState = IEditingState | IReadState;

const keyMap = {
};

export default React.forwardRef(({ card, selected, onClick, style }: IProps, ref: React.Ref<HTMLDivElement>) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  const [state, setState] = React.useState<IState>({ type: 'read' });

  React.useEffect(() => {
    if(inputRef.current && state.type === 'editing' && document.activeElement !== inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current, state.type]);

  const enableEditing = () => {
    setState({ type: 'editing', name: card.name });
  }

  const hotKeyHandlers = {
    EDIT: enableEditing,
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    switch(event.key) {
      case 'Enter':
        event.preventDefault();
        return;
      case 'Escape':
        setState({ type: 'read' });
        return;
    }
  }
  
  return (
      <Card ref={ref} key={card.id} selected={selected} style={style} onClick={onClick}>
        {(() => {
          switch(state.type) {
            case 'read':
              return (
                <Name selected={selected} onDoubleClick={enableEditing}>{card.name}</Name>
              );
            case 'editing':
              return (
                <NameInput ref={inputRef} value={state.name} onChange={(e) => setState({ type: 'editing', name: e.target.value })} onKeyDown={onKeyDown} />
              );
          }
        })()}
      </Card>
  );
});

const Card = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  position: relative;
  margin-left: 10px;
  ${({ selected }) => selected && 'font-weight: 600'}
`;

const Name = styled.div<{ selected: boolean }>`
  flex-grow: 1;
  padding: 5px;
  ${({ selected }) => selected && 'font-weight: 600;'}
  cursor: pointer;
`;

const NameInput = styled(BaseInput)`
  padding: 5px;
`;