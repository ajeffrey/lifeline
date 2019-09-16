import * as React from 'react';
import * as chroma from 'chroma-js';
import { generate } from 'shortid';
import styled from 'styled-components';
import { append, filter } from 'ramda';
import { animated, config } from 'react-spring';
import { Transition } from 'react-spring/renderprops';
import NotificationContext from 'src/contexts/NotificationContext';

interface IProps {
  children: React.ReactNode;
}

interface INotification {
  type: 'success' | 'error';
  id: string;
  message: string;
}

export default ({ children }: IProps) => {
  const [cancelMap] = React.useState(() => new WeakMap());
  const [notifications, setNotifications] = React.useState<INotification[]>([]);

  const dropNotification = (id: string) => {
    setNotifications(filter(item => item.id !== id));
  }

  const transitionProps = {
    items: notifications,
    keys: item => item.id,
    from: { opacity: 0, life: '100%' },
    enter: { opacity: 1 },
    leave: item => async (next, cancel) => {
      cancelMap.set(item, cancel);
      await next({ life: '0%' });
      await next({ opacity: 0 }, true);
    },
    onRest: item => {
      dropNotification(item.id);
    },
    config: (item, state) => (state === 'leave' ? [{ duration: 3000 }, config.default] as any : config.default),
  };

  const success = (message: string) => {
    setNotifications(append<INotification>({ type: 'success', id: generate(), message }));
  }

  const error = (message: string) => {
    setNotifications(append<INotification>({ type: 'error', id: generate(), message }));
  }

  return (
    <NotificationContext.Provider value={{ success, error }}>
      {children}
      <Notifications>
        <Transition {...transitionProps}>
          {item => ({ life, ...props }) => {
            const cancel = cancelMap.get(item);
            return (
              <Notification style={props}>
                <Content>{item.message}</Content>
                {cancel && <CancelButton onClick={cancel}><i className="fal fa-fw fa-times" /></CancelButton>}
                <Life type={item.type} style={{ height: life }} />
              </Notification>
            )
          }}
        </Transition>
      </Notifications>
    </NotificationContext.Provider>
  )
}

const Notifications = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
`;

const Notification = animated(styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  margin-top: 5px;
  background: white;
  font-size: 14px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.5);
  min-width: 250px;
`);

const Content = styled.div`
  flex-grow: 1;
  padding: 10px;
  padding-right: 0;
`;

const Life = styled.div<{ type: 'success' | 'error' }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 5px;
  background: ${({ type }) => {
    switch(type) {
      case 'error': return chroma.lch(45, 130, 25).css();
      case 'success': return chroma.lch(45, 130, 170).css();
    }
  }};
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  padding: 10px;
  opacity: 0.25;
  &:hover {
    opacity: 0.75;
  }
`;