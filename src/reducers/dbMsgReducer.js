import { SET_DB_MSG, CLEAR_DB_MSG, CLEAR_STORE } from '../constants/actionTypes';

const dbMsgReducer = (state = {dbMsg: null}, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_DB_MSG:
      return ({
        dbMsg: payload.dbMsg
      });
    case CLEAR_DB_MSG:
      return ({
        dbMsg: null
      });
    case CLEAR_STORE:
      return ({
        dbMsg: null
      });
    default:
      return state;
  }
};

export default dbMsgReducer;
