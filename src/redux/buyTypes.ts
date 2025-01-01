import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BuyType} from '../constants/interfaces/buyInterfaces';

const initialState: BuyType[] = [];

const buyTypesSlice = createSlice({
  name: 'buyTypes',
  initialState,
  reducers: {
    updateBuyTypes: (state, action: PayloadAction<BuyType[]>) => {
      state.splice(0, state.length, ...action.payload);
    },
  },
});

export const {updateBuyTypes} = buyTypesSlice.actions;
export default buyTypesSlice.reducer;
