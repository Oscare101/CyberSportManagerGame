import { configureStore } from '@reduxjs/toolkit'
import tournamentsReducer from './tournaments'
import teamsReducer from './teams'

export const store = configureStore({
  reducer: { tournaments: tournamentsReducer, teams: teamsReducer },
})
