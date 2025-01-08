import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customerInformation: null,
  currentActiveAddress: null,
};

const userSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomerInformation: (state, action) => {
      state.customerInformation = action.payload;
    },
    setCurrentActiveAddress: (state, action) => {
      state.currentActiveAddress = action.payload;
    },
    clearCustomerData: (state) => {
      state.customerInformation = null;
      state.currentActiveAddress = null;
    },
    addCustomerAddress: (state, action) => {
      state.customerInformation.addresses.push(action.payload)
    },
    removeCustomerAddress: (state, action) => {
      if (state.customerInformation && state.customerInformation.addresses) {
        state.customerInformation.addresses = state.customerInformation.addresses.filter(
          address => address._id !== action.payload
        );
        if (state.currentActiveAddress && state.currentActiveAddress._id === action.payload) {
          state.currentActiveAddress = null;
        }
      }
    },
  },
});

export const selectCurrentAddress = (state) => state.customer?.currentActiveAddress;
export const selectCustomer = (state) => state.customer?.customerInformation;

export const {
  setCustomerInformation,
  setCurrentActiveAddress,
  clearCustomerData,
  addCustomerAddress,
  removeCustomerAddress
} = userSlice.actions;

export default userSlice.reducer;
