import { SET_DB_MSG, CLEAR_DB_MSG, CLEAR_STORE } from '../constants/actionTypes';

const dbMsgReducer = (state = {msgText: '', msgParams: null}, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_DB_MSG:
      return ({
        msgText: payload.msgText,
        msgParams: payload.msgParams
      });
    case CLEAR_DB_MSG:
      return ({
        msgText: '',
        msgParams: null
      });
    case CLEAR_STORE:
      return ({
        msgText: '',
        msgParams: null
      });
    default:
      return state;
  }
};

export default dbMsgReducer;
