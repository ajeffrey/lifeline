import * as React from 'react';
import { render } from 'react-dom';
import App from './modules/App';

window.addEventListener('unhandledrejection', (event => {
  console.error(event);
}))

render(<App />, document.getElementById('root'));
