/* eslint-env jasmine, jest */
import { createRoot } from 'react-dom/client';

import Selector from '../app/components/Selector';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<Selector handleChange={() => undefined} titles={[]} />);
});
