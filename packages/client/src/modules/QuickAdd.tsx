import * as React from 'react';
import styled from 'styled-components';
import { HotKeys } from 'react-hotkeys';
import { CreateCardCommand, ICreateCardReport } from '@ll/shared/src/commands/CreateCardCommand';
import SocketContext from 'src/API/SocketContext';
import NotificationContext from 'src/contexts/NotificationContext';
import { Transition, animated } from 'react-spring/renderprops';

interface IProps {
  isOpen: boolean;
  onClose(): any;
}

const keyMap = {
  CLOSE: 'esc',
};

export default ({ isOpen, onClose }: IProps) => {
  const [ref, setRef] = React.useState<HTMLInputElement | null>(null);
  const { socket } = React.useContext(SocketContext);
  const { success, error } = React.useContext(NotificationContext);
  const [name, setName] = React.useState<string>('');

  React.useEffect(() => {
    if(ref) {
      isOpen ? ref.focus() : ref.blur();
    }
  }, [ref, isOpen]);

  const transition = {
    native: true,
    unique: true,
    items: isOpen,
    from: { opacity: 0, bottom: '-50px' },
    enter: { opacity: 1, bottom: '0px' },
    leave: { opacity: 0, bottom: '-50px' },
  };

  const handleClose = () => {
    document.activeElement && (document.activeElement as any).blur();
    onClose();
  }

  const onSubmit = (e) => {
    e.preventDefault();
    socket.command<ICreateCardReport>(CreateCardCommand(name)).then(report => {
      if(report.type === 'created') {
        success('Card created');
        handleClose();
        
      } else {
        error('Failed to create card');
      }
    });
  };

  const hotkeyHandlers = {
    CLOSE: handleClose,
  };

  return (
    <Transition {...transition}>
      {show => props => show && (
        <Shadow style={{ opacity: props.opacity }}>
          <HotKeys keyMap={keyMap} handlers={hotkeyHandlers}>
            <Modal style={{ bottom: props.bottom }} onSubmit={onSubmit}>
              <Title>Add a New Card</Title>
              <Input ref={setRef} type="text" value={name} onChange={e => setName(e.target.value)} onBlur={onClose} />
            </Modal>
          </HotKeys>
        </Shadow>
      )}
    </Transition>
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
  background: rgba(255, 255, 255, 0.75);
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