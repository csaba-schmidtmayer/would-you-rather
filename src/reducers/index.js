import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';

import userReducer from './userReducer';
import dbMsgReducer from './dbMsgReducer';
import activeUserReducer from './activeUserReducer';

export default combineReducers({
  loadingBar: loadingBarReducer,
  users: userReducer,
  dbMsg: dbMsgReducer,
  activeUser: activeUserReducer
});
