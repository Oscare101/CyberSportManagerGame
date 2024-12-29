import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Tournament} from '../constants/interfaces/tournamentInterfaces';

const initialState: Tournament[] = [];

const tournamentsSlice = createSlice({
  name: 'tournaments',
  initialState,
  reducers: {
    updateTournaments: (state, action: PayloadAction<Tournament[]>) => {
      state.splice(0, state.length, ...action.payload);
    },
  },
});

export const {updateTournaments} = tournamentsSlice.actions;
export default tournamentsSlice.reducer;
