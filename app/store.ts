import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers/movies';

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat((store) => (next) => (action) => {
      if (typeof action !== 'function') {
        console.log('dispatching:', action, store.getState());
      }
      return next(action);
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
