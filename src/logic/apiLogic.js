import { createLogic } from 'redux-logic';
import { axios } from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { LOGIN, LOGOUT } from '../constants/actionTypes';

/*export const registerUserLogic = async () => {
  createLogic({

  })
};*/

export const loginUserLogic = createLogic({
  type: LOGIN,

  async process({ getState, action, httpClient }, dispatch, done) {
    const query = `mutation LoginUser($credentials: UserCredentialsInput) {
      loginUser(credentials: $credentials)
    }`;
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
