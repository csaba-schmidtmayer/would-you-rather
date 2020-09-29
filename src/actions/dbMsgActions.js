import { SET_DB_MSG, CLEAR_DB_MSG } from '../constants/actionTypes';
import makeActionCreator from './makeActionCreator';

export const setDbMsg = makeActionCreator(SET_DB_MSG, 'dbMsg');
export const clearDbMsg = makeActionCreator(CLEAR_DB_MSG);
