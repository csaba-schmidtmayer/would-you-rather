import { createLogic } from 'redux-logic';
import { axios } from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import sha256 from 'crypto-js/sha256';
import Hex from 'crypto-js/enc-hex';

import { REGISTER, CHANGE_AVATAR, CHANGE_PASSWORD, LOGIN, LOGOUT, NEW_POLL, ANSWER_POLL } from '../constants/actionTypes';
import { SUCCESS, API_PATH } from '../constants/const';
import { setDbMsg, clearDbMsg } from '../actions/dbMsgActions';
import { setActiveUser, populateUsers, changeAvatarUpdate, changeAvatarRevert } from '../actions/userActions';
import { populatePolls, addNewPoll, answerPollUpdate, answerpollRevert } from '../actions/pollActions';
import { clearStore } from '../actions/storeActions';

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
};

const hashPwd = (password) => (
  Hex.stringify(sha256(password))
);

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
          password: hashPwd(action.payload.password)
        },
        name: action.payload.name,
        avatar: action.payload.avatar
      }
    };
    dispatch(clearDbMsg());
    dispatch(showLoading());
    try {
      await checkForErrors(httpClient.post, dispatch, API_PATH, data);
      dispatch(setDbMsg(SUCCESS));
      dispatch(clearDbMsg());
    }
    catch (error) {
    }
    finally {
      dispatch(hideLoading());
      done();
    }
  }
});

const changeAvatarLogic = createLogic({
  type: CHANGE_AVATAR,

  async process({ getState, action, httpClient }, dispatch, done) {
    const user = getState().activeUser.username;
    const oldAvatar = getState().activeUser.avatar;
    const newAvatar = action.payload.avatar;
    const reqAvatarData = {
      query: `
        mutation ChangeAvatar(
          $avatar : String!
        ) {
          changeAvatar(
            avatar: $avatar
          )
        }
      `,
      variables: {
        avatar: newAvatar
      }
    };
    dispatch(clearDbMsg());
    dispatch(changeAvatarUpdate(user, newAvatar));
    try {
      await checkForErrors(httpClient.post, dispatch, API_PATH, reqAvatarData);
    }
    catch (error) {
      dispatch(changeAvatarRevert(user, oldAvatar));
    }
    finally {
      done();
    }
  }
});

const changePasswordLogic = createLogic({
  type: CHANGE_PASSWORD,

  async process({ getState, action, httpClient }, dispatch, done) {
    const reqPasswordData = {
      query: `
        mutation ChangePassword(
          $password : String!
        ) {
          changePassword(
            password: $password
          )
        }
      `,
      variables: {
        password: hashPwd(action.payload.password)
      }
    };
    dispatch(clearDbMsg());
    try {
      await checkForErrors(httpClient.post, dispatch, API_PATH, reqPasswordData);
    }
    catch (error) {
    }
    finally {
      done();
    }
  }
});

const loginUserLogic = createLogic({
  type: LOGIN,

  async process({ getState, action, httpClient }, dispatch, done) {
    dispatch(clearDbMsg());
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
            password: hashPwd(action.payload.password)
          }
        }
      };
      const tokenData = await checkForErrors(httpClient.post, dispatch, API_PATH, reqTokenData);
      httpClient.defaults.headers.common['Authorization'] = tokenData.loginUser;
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
              polls,
              numOfAnswers
            }
          }
        `
      };
      const usersData = await checkForErrors(httpClient.post, dispatch, API_PATH, reqUsersData);
      dispatch(populateUsers(usersData.getAllUsers));
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
                 id,
                 option
               }
             }
           }
         `
      };
      const activeUserData = await checkForErrors(httpClient.post, dispatch, API_PATH, reqActiveUserData);
      dispatch(setActiveUser(activeUserData.activeUser));
    }
    catch (error) {
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
      dispatch(clearStore());
    }
    catch (error) {
    }
    finally {
      done();
    }
  }
});

const newPollLogic = createLogic({
  type: NEW_POLL,

  async process({ getState, action, httpClient }, dispatch, done) {
    dispatch(clearDbMsg());
    dispatch(showLoading());
    try {
      const reqNewPollData = {
        query: `
          mutation NewPoll(
            $options: PollOptions
          ){
            createPoll(
              options: $options
            ){
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
        `,
        variables: {
          options: {
            optionOne: action.payload.optionOne,
            optionTwo: action.payload.optionTwo
          }
        }
      };
      const newPollData = await checkForErrors(httpClient.post, dispatch, API_PATH, reqNewPollData);
      dispatch(addNewPoll(newPollData.createPoll));
      dispatch(setDbMsg(SUCCESS, {pollId: newPollData.createPoll.id}));
      dispatch(clearDbMsg());
    }
    catch (error) {
    }
    finally {
      dispatch(hideLoading());
      done();
    }
  }
});

const answerPollLogic = createLogic({
  type: ANSWER_POLL,

  async process ({ getState, action, httpClient}, dispatch, done) {
    dispatch(clearDbMsg());
    const updatePayload = {
      ...action.payload,
      user: getState().activeUser.username
    };
    dispatch(answerPollUpdate(updatePayload));
    try {
      const reqAnswerPollData = {
        query: `
          mutation AnswerPoll(
            $answer: PollAnswer
          ){
            answerPoll(
              answer: $answer
            )
          }
        `,
        variables: {
          answer: {
            id: action.payload.id,
            option: action.payload.option
          }
        }
      };
      await checkForErrors(httpClient.post, dispatch, API_PATH, reqAnswerPollData);
    }
    catch (error) {
      dispatch(answerpollRevert(updatePayload));
    }
    finally {
      done();
    }
  }
});

export default [
  registerUserLogic,
  changeAvatarLogic,
  changePasswordLogic,
  loginUserLogic,
  logoutUserLogic,
  newPollLogic,
  answerPollLogic
];
