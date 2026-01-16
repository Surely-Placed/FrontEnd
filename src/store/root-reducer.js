import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/user.reducer';
import loadingReducer from './loading/loading.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  // Add other reducers here as needed
});

export default rootReducer;
