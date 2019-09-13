import * as React from 'react';
import { Observable } from 'rxjs';

interface ILoadingState {
  type: 'loading';
}

interface IErrorState {
  type: 'error';
  error: any;
}

interface IReadyState<T> {
  type: 'ready';
  data: T;
}

type IState<T> = ILoadingState | IErrorState | IReadyState<T>;

interface IPromiseProps<T> {
  promise: Promise<T>;
  children(state: IState<T>): React.ReactElement | null;
}

interface IObservableProps<T> {
  observable: Observable<T>;
  children(state: IState<T>): React.ReactElement | null;
}

type IProps<T> = IPromiseProps<T> | IObservableProps<T>;

export default function Loader<T>(props: IProps<T>) {
  const [state, setState] = React.useState<IState<T>>({ type: 'loading' });

  React.useEffect(() => {
    if('promise' in props) {
      props.promise
        .then(data => setState({ type: 'ready', data }))
        .catch(error => setState({ type: 'error', error }));

    } else {
      props.observable.subscribe(
        data => setState({ type: 'ready', data }),
        error => setState({ type: 'error', error }),
      );
    }
  }, []);

  return props.children(state);
}
