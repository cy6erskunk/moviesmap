/* eslint-env jasmine, jest */
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from '../app/components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  function noop() {
    return undefined;
  }
  root.render(<App locations={[]} titles={[]} init={noop} />);
});
