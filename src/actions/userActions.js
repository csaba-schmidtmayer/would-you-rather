import { LOGIN, REGISTER } from '../constants/actionTypes';
import makeActionCreator from './makeActionCreator';

export const login = makeActionCreator(LOGIN, 'username', 'password');
export const register = makeActionCreator(REGISTER, 'username', 'name', 'avatar', 'password');
