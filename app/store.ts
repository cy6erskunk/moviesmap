import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers/movies';

const logMe = (store: any) => (next: any) => (action: any) => {
  if (typeof action !== 'function') {
    // eslint-disable-next-line no-console
    console.log('dispatching:', action, store.getState());
  }
  return next(action);
};

const store = createStore(
  reducer,
  // @ts-expect-error ts-migrate(2339) FIXME: Property '__REDUX_DEVTOOLS_EXTENSION__' does not e... Remove this comment to see the full error message
  window.__REDUX_DEVTOOLS_EXTENSION__?.(),
  applyMiddleware(thunk, logMe)
);
export default store;
