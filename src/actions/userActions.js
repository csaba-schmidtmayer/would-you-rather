import { LOGIN, LOGOUT, REGISTER, SET_ACTIVE_USER } from '../constants/actionTypes';
import makeActionCreator from './makeActionCreator';

export const login = makeActionCreator(LOGIN, 'username', 'password');
export const logout = makeActionCreator(LOGOUT);
export const register = makeActionCreator(REGISTER, 'username', 'name', 'avatar', 'password');
export const setActiveUser = makeActionCreator(SET_ACTIVE_USER, 'activeUser');

export const delActiveUser = () => (setActiveUser(null));
