import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Team } from '../constants/interfaces'

const initialState: Team[] = []

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    updateTeams: (state, action: PayloadAction<Team[]>) => {
      state.splice(0, state.length, ...action.payload)
    },
  },
})

export const { updateTeams } = teamsSlice.actions
export default teamsSlice.reducer
