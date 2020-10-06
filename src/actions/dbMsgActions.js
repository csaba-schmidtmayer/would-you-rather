import { SET_DB_MSG, CLEAR_DB_MSG } from '../constants/actionTypes';
import makeActionCreator from './makeActionCreator';

export const setDbMsg = (msgText, msgParams = null) => ({
  type: SET_DB_MSG,
  payload: {
    msgText,
    msgParams
  }
});
export const clearDbMsg = makeActionCreator(CLEAR_DB_MSG);
