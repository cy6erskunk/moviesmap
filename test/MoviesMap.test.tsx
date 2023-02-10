/* eslint-env jasmine, jest */
import React from 'react';
import { createRoot } from 'react-dom/client';

import MoviesMap from '../app/components/MoviesMap';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<MoviesMap />);
});
