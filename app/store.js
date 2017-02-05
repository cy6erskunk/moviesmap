import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';

const logMe = (store) => (next) => (action) => {
    // eslint-disable-next-line no-console
    console.log(action, store.getState());
    return next(action);
};

const store = createStore(reducer, applyMiddleware(logMe));
export default store;
