/* eslint-env jasmine, jest */
import React from 'react';
import ReactDOM from 'react-dom';

import App from '../app/components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  function noop() {
    return undefined;
  }
  ReactDOM.render(<App locations={[]} titles={[]} init={noop} />, div);
});
