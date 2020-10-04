import { CLEAR_STORE } from '../constants/actionTypes';
import makeActionCreator from './makeActionCreator';

export const clearStore = makeActionCreator(CLEAR_STORE);
