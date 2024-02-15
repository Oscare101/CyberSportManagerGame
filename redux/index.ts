import { configureStore } from '@reduxjs/toolkit'
import tournamentsReducer from './tournaments'
import teamsReducer from './teams'

export const store = configureStore({
  reducer: { tournaments: tournamentsReducer, teams: teamsReducer },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
