import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  substations: [],
  selectedSubstation: null,
  substationOrders: [],
  isLoading: false,
  error: null,
};

const substationSlice = createSlice({
  name: 'substation',
  initialState,
  reducers: {
    fetchSubstationsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSubstationsSuccess: (state, action) => {
      state.isLoading = false;
      state.substations = action.payload;
    },
    fetchSubstationsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedSubstation: (state, action) => {
      state.selectedSubstation = action.payload;
    },
    fetchSubstationOrdersStart: (state) => {
      state.isLoading = true;
    },
    fetchSubstationOrdersSuccess: (state, action) => {
      state.isLoading = false;
      state.substationOrders = action.payload;
    },
    fetchSubstationOrdersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSubstationsStart,
  fetchSubstationsSuccess,
  fetchSubstationsFailure,
  setSelectedSubstation,
  fetchSubstationOrdersStart,
  fetchSubstationOrdersSuccess,
  fetchSubstationOrdersFailure,
} = substationSlice.actions;
export default substationSlice.reducer;
