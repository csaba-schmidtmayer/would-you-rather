import { FETCH_DATA, CLEAR_STORE } from '../constants/actionTypes';
import makeActionCreator from './makeActionCreator';

export const fetchData = makeActionCreator(FETCH_DATA);
export const clearStore = makeActionCreator(CLEAR_STORE);
