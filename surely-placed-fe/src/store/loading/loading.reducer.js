import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {},
  reducers: {
    setLoading: (state, { payload: { key, value } }) => {
      state[key] = value;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
