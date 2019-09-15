import * as React from 'react';
import { configure } from 'react-hotkeys';
import { render } from 'react-dom';
import App from './modules/App';

window.addEventListener('unhandledrejection', (event => {
  console.error(event);
}));

configure({
  ignoreEventsCondition: (event) => {
    const allowedKeys = ['Escape'];
    const deniedTags = ['input', 'textarea', 'select'];

    const tagName: string | undefined = event.target && event.target['tagName'].toLowerCase();
    
    if(tagName && deniedTags.includes(tagName)) {
      return !allowedKeys.includes(event.key);
    } else {
      return false;
    }
  }
});

render(<App />, document.getElementById('root'));
