// UserInfoSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {
    number: '',
    email: '',
  },
  DebitCardInfo: {
    DebitCardNumber: '',
    FirstName: '',
    LastName: '',
    ExpirationDate: '',
    CVV: '',
  },
  DebitCardAddress: {
    Address: '',
    Apt: '',
    zipCode: '',
    City: '',
    State: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updatedUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    UpdatedDebitCardInfo: (state, action) => {
      state.DebitCardInfo = action.payload;
    },
    UpdatedDebitCardAddress: (state, action) => {
      state.DebitCardAddress = action.payload;
    },
  },
});

export const { updatedUserInfo, UpdatedDebitCardInfo, UpdatedDebitCardAddress } = userSlice.actions;
export default userSlice.reducer;
