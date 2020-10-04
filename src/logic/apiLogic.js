import { createLogic } from 'redux-logic';
import { axios } from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { REGISTER, LOGIN, LOGOUT } from '../constants/actionTypes';
import { SUCCESS, API_PATH } from '../constants/const';
import { setDbMsg, clearDbMsg } from '../actions/dbMsgActions';
import { setActiveUser, delActiveUser, populateUsers } from '../actions/userActions';
import { populatePolls } from '../actions/pollActions';

const checkForErrors = async (query, dispatch, ...args) => {
  try {
    const response = await query(...args);
    if (response.data.errors === undefined) {
      return response.data.data;
    }
    else {
      const errMsg = response.data.errors[0].message;
      dispatch(setDbMsg(errMsg));
      throw new Error(errMsg);
    }
  }
  catch (error) {
    throw error;
  }
}

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
      await checkForErrors(httpClient.post, dispatch, API_PATH, data);
      dispatch(setDbMsg(SUCCESS));
      dispatch(clearDbMsg());
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
    dispatch(showLoading());
    try {
      const reqTokenData = {
        query: `
          mutation LoginUser(
            $credentials: UserCredentialsInput
          ) {
            loginUser(
              credentials: $credentials
            )
          }
        `,
        variables: {
          credentials: {
            username: action.payload.username,
            password: action.payload.password
          }
        }
      };
      const tokenData = await checkForErrors(httpClient.post, dispatch, API_PATH, reqTokenData);
      httpClient.defaults.headers.common['Authorization'] = tokenData.loginUser;
      const reqActiveUserData = {
	       query: `
           query GetActiveUser{
             activeUser{
               userData{
                 username,
                 name,
                 avatar
               },
               answers{
                 pollId,
                 option
               }
             }
           }
         `
      };
      const activeUserData = await checkForErrors(httpClient.post, dispatch, API_PATH, reqActiveUserData);
      dispatch(setActiveUser(activeUserData.activeUser));
      const reqPollsData = {
        query: `
          query GetAllPolls{
            getAllPolls{
              id,
              author,
              optionOne{
                text,
                numOfAnswers
              },
              optionTwo{
                text,
                numOfAnswers
              },
              created
            }
          }
        `
      };
      const pollsData = await checkForErrors(httpClient.post, dispatch, API_PATH, reqPollsData);
      dispatch(populatePolls(pollsData.getAllPolls));
      const reqUsersData = {
        query: `
          query GetAllUsers{
            getAllUsers{
              username,
              name,
              avatar,
              numOfPolls,
              numOfAnswers
            }
          }
        `
      };
      const usersData = await checkForErrors(httpClient.post, dispatch, API_PATH, reqUsersData);
      dispatch(populateUsers(usersData.getAllUsers));
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

const logoutUserLogic = createLogic({
  type: LOGOUT,

  async process({ getState, action, httpClient }, dispatch, done) {
    try {
      const reqLogoutData = {
        query: `
          mutation Logout(
            $username: String
          ){
            logoutUser(
              username: $username
            )
          }
        `,
        variables: {
          username: getState().activeUser.username
        }
      };
      await checkForErrors(httpClient.post, dispatch, API_PATH, reqLogoutData);
      delete httpClient.defaults.headers.common['Authorization'];
      dispatch(delActiveUser());
    }
    catch (error) {
      console.log(error);
    }
    finally {
      done();
    }
  }
})

export default [
  registerUserLogic,
  loginUserLogic,
  logoutUserLogic
];
