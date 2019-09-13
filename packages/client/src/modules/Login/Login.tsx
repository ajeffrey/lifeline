import * as React from 'react';
import * as chroma from 'chroma-js';
import { compose } from 'ramda';
import * as Event from 'src/lib/events';
import { DarkButton } from 'src/components/Button';
import * as S from './Login.styled';

interface IProps {
  error: string | null;
  onLogin(email: string, password: string): any;
}

interface IState {
  email: string;
  password: string;
}

export default function Login({ onLogin, error }: IProps) {
  const [state, setState] = React.useState<IState>({ email: '', password: '' });
  const { email, password } = state;

  const setEmail = (email: string) => setState({ ...state, email});
  const setPassword = (password: string) => setState({ ...state, password});
  const login = () => {
    onLogin(email, password);
  }
  
  return (
    <S.Layout>
      <S.Form action="" onSubmit={compose(login, Event.prevent)}>
        {error && (
          <S.Error>{error}</S.Error>
        )}
        <S.Field>
          <S.Label>Email</S.Label>
          <S.Input type="text" value={email} autoFocus onChange={compose(setEmail, Event.value)} />
        </S.Field>
        <S.Field>
          <S.Label>Password</S.Label>
          <S.Input type="password" value={password} onChange={compose(setPassword, Event.value)} />
        </S.Field>
        <S.Actions>
          <DarkButton _color={chroma.lch(65, 55, 180)}>Login</DarkButton>
        </S.Actions>
      </S.Form>
    </S.Layout>
  );
};
