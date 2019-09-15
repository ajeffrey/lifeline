import * as React from 'react';
import styled from 'styled-components';
import { HotKeys, GlobalHotKeys } from 'react-hotkeys';
import { CreateTaskCommand, ICreateTaskReport } from '@ll/shared/src/commands/CreateTaskCommand';
import SocketContext from 'src/API/SocketContext';
import NotificationContext from 'src/contexts/NotificationContext';
import { Transition, animated } from 'react-spring/renderprops';

interface IState {
  open: boolean;
  name: string;
}

const globalKeyMap = {
  OPEN: 'q',
};

const keyMap = {
  CLOSE: 'esc',
};

export default () => {
  const [ref, setRef] = React.useState<HTMLInputElement | null>(null);
  const { socket } = React.useContext(SocketContext);
  const { success, error } = React.useContext(NotificationContext);
  const [state, setState] = React.useState<IState>({ name: '', open: false });
  const { open, name } = state;

  React.useEffect(() => {
    if(ref) {
      open ? ref.focus() : ref.blur();
    }
  }, [ref, open]);

  const transition = {
    native: true,
    unique: true,
    items: open,
    from: { opacity: 0, bottom: '-50px' },
    enter: { opacity: 1, bottom: '0px' },
    leave: { opacity: 0, bottom: '-50px' },
  };

  const onClose = () => {
    document.activeElement && (document.activeElement as any).blur();
    setState(state => ({ ...state, open: false }));
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setState(state => ({ ...state, name: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    socket.command<ICreateTaskReport>(CreateTaskCommand(name)).then(report => {
      if(report.type === 'created') {
        success('Task created');
        onClose();
        
      } else {
        error('Failed to create task');
      }
    });
  };

  const hotkeyHandlers = {
    CLOSE: onClose,
  };

  const globalHandlers = {
    OPEN: (event) => {
      event.preventDefault();
      setState({ open: true, name: '' });
    },
  };

  return (
    <GlobalHotKeys keyMap={globalKeyMap} handlers={globalHandlers}>
      <Transition {...transition}>
        {show => props => show && (
          <Shadow style={{ opacity: props.opacity }}>
            <HotKeys keyMap={keyMap} handlers={hotkeyHandlers}>
              <Modal style={{ bottom: props.bottom }} onSubmit={onSubmit}>
                <Title>Add a New Task</Title>
                <Input ref={setRef} type="text" value={name} onChange={onChange} onBlur={onClose} />
              </Modal>
            </HotKeys>
          </Shadow>
        )}
      </Transition>
    </GlobalHotKeys>
  );
}

const Shadow = animated(styled.div`
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(2px);
`);

const Modal = animated(styled.form`
  position: relative;
  bottom: -50px;
  width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`);

const Title = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: #333;
  margin-bottom: 10px;
`;

const Input = styled.input`
  box-sizing: border-box;
  border: none;
  background: white;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25);
  height: 40px;
  padding: 0 10px;
  border-radius: 3px;
  font-size: 16px;
  font-family: inherit;
  border: 1px solid #ddd;
`;