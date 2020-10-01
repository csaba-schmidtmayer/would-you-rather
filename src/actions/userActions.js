import { LOGIN, REGISTER, SET_ACTIVE_USER } from '../constants/actionTypes';
import makeActionCreator from './makeActionCreator';

export const login = makeActionCreator(LOGIN, 'username', 'password');
export const register = makeActionCreator(REGISTER, 'username', 'name', 'avatar', 'password');
export const setActiveUser = makeActionCreator(SET_ACTIVE_USER, 'activeUser');
