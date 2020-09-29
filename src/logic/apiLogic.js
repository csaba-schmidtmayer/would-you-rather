import { createLogic } from 'redux-logic';
import { axios } from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { REGISTER, LOGIN, LOGOUT } from '../constants/actionTypes';
import { SUCCESS } from '../constants/const';
import { setDbMsg, clearDbMsg } from '../actions/dbMsgActions';

const registerUserLogic = createLogic({
  type: REGISTER,

  async process({ getState, action, httpClient }, dispatch, done) {
    const query = `
      mutation RegisterUser(
        $credentials: UserCredentialsInput,
        $name: String!,
        $avatar: String!
      ) {
        registerUser(
          credentials: $credentials,
          name: $name,
          avatar: $avatar
        )
      }
    `;
    const data = {
      query,
      variables: {
        credentials: {
          username: action.payload.username,
          password: action.payload.password
        },
        name: action.payload.name,
        avatar: action.payload.avatar
      }
    };
    dispatch(showLoading());
    try {
      const response = await httpClient.post('/', data);
      const dbMsg = response.data.data.registerUser;
      if (dbMsg === null) {
        dispatch(setDbMsg(SUCCESS));
        dispatch(clearDbMsg());
      }
      else {
        dispatch(setDbMsg(dbMsg));
      }      
    }
    catch (error) {
      console.log(error);
    }
    finally {
      dispatch(hideLoading());
      done();
    }
  }
});

const loginUserLogic = createLogic({
  type: LOGIN,

  async process({ getState, action, httpClient }, dispatch, done) {
    const query = `
      mutation LoginUser(
        $credentials: UserCredentialsInput
      ) {
        loginUser(
          credentials: $credentials
        )
      }
    `;
    const data = {
      query,
      variables: {
        credentials: {
          username: action.payload.username,
          password: action.payload.password
        }
      }
    };
    dispatch(showLoading());
    try {
      const response = await httpClient.post('/', data);
      httpClient.defaults.headers.common['Authorization'] = response.data.data.loginUser;
      // TODO: dispatch data fetching logic
    }
    catch (error) {
      console.log(error);
    }
    finally {
      dispatch(hideLoading());
      done();
    }
  }
});

export default [
  registerUserLogic,
  loginUserLogic
];
