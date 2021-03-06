import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducers/movies'

const logMe = store => next => action => {
  if (typeof action !== 'function') {
    // eslint-disable-next-line no-console
    console.log('dispatching:', action, store.getState())
  }
  return next(action)
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, logMe),
)
export default store
