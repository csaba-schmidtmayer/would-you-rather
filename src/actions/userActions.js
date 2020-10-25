import { LOGIN, LOGOUT, REGISTER, CHANGE_AVATAR, CHANGE_AVATAR_UPDATE, CHANGE_AVATAR_REVERT, SET_ACTIVE_USER, POPULATE_USERS } from '../constants/actionTypes';
import makeActionCreator from './makeActionCreator';

export const login = makeActionCreator(LOGIN, 'username', 'password');
export const logout = makeActionCreator(LOGOUT);
export const register = makeActionCreator(REGISTER, 'username', 'name', 'avatar', 'password');
export const changeAvatar = makeActionCreator(CHANGE_AVATAR, 'avatar');
export const changeAvatarUpdate = makeActionCreator(CHANGE_AVATAR_UPDATE, 'user', 'avatar');
export const changeAvatarRevert = makeActionCreator(CHANGE_AVATAR_REVERT, 'user', 'avatar');
export const setActiveUser = makeActionCreator(SET_ACTIVE_USER, 'activeUser');
export const populateUsers = makeActionCreator(POPULATE_USERS, 'users');
