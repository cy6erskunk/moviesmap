import type { Middleware } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import type { MoviesState } from './reducers/movies';
import reducer from './reducers/movies';

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    const logger: Middleware<unknown, MoviesState> =
      (store) => (next) => (action) => {
        if (typeof action !== 'function') {
          console.log('dispatching:', action, store.getState());
        }
        return next(action);
      };
    return getDefaultMiddleware().concat(logger);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
