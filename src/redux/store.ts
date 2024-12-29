import {configureStore} from '@reduxjs/toolkit';
import tournamentsReducer from './tournaments';

export const store = configureStore({
  reducer: {
    tournaments: tournamentsReducer,
  },
});
