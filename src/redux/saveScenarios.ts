import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Save} from '../constants/interfaces/tacticsInterfaces';
import saveScenariosDefault from '../constants/defaultData/saveScenariosDefault';

const initialState: Save = saveScenariosDefault;

const saveScenariosSlice = createSlice({
  name: 'saveScenarios',
  initialState,
  reducers: {
    updateSaveScenarios: (state, action: PayloadAction<Save>) => {
      state = action.payload;
    },
  },
});

export const {updateSaveScenarios} = saveScenariosSlice.actions;
export default saveScenariosSlice.reducer;
