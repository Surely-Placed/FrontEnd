import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  is_preference_saved: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setIsPreferenceSaved: (state, action) => {
      state.is_preference_saved = !state.is_preference_saved;
    },
    logoutAction: (state) => {
      state.userData = null;
    },
  },
});

export const { setUserData, setIsPreferenceSaved, logoutAction } =
  userSlice.actions;

// Selectors
export const selectUserData = (state) => state?.user?.userData;
export const selectUserProfile = (state) => state?.user?.userProfile;
export const selectIsPreferenceSaved = (state) => state.user.is_preference_saved;

export default userSlice.reducer;
