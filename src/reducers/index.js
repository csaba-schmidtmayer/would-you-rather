import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';

import userReducer from './userReducer';

export default combineReducers({
  loadingBar: loadingBarReducer,
  users: userReducer
});
