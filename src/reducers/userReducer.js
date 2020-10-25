import produce from 'immer';

import { POPULATE_USERS, ADD_NEW_POLL, ANSWER_POLL_UPDATE, ANSWER_POLL_REVERT, CHANGE_AVATAR_UPDATE, CHANGE_AVATAR_REVERT, CLEAR_STORE } from '../constants/actionTypes';

const userReducer = (state = {}, action) => {
  const { type, payload } = action;
  let nextState;
  switch(type) {
    case POPULATE_USERS:
      const usersAssocArr = {};
      payload.users.forEach((user) => {
        usersAssocArr[user.username] = {
          username: user.username,
          name: user.name,
          avatar: user.avatar,
          polls: user.polls,
          numOfAnswers: user.numOfAnswers
        };
      });
      return usersAssocArr;
    case ADD_NEW_POLL:
      nextState = produce(state, draftState => {
        draftState[payload.poll.author].polls.push(payload.poll.id);
      });
      return nextState;
    case ANSWER_POLL_UPDATE:
      nextState = produce(state, draftState => {
        draftState[payload.user].numOfAnswers += 1;
      });
      return nextState;
    case ANSWER_POLL_REVERT:
      nextState = produce(state, draftState => {
        draftState[payload.user].numOfAnswers -= 1;
      });
      return nextState;
    case CHANGE_AVATAR_UPDATE:
      nextState = produce(state, draftState => {
        draftState[payload.user].avatar = payload.avatar;
      });
      return nextState;
    case CHANGE_AVATAR_REVERT:
      nextState = produce(state, draftState => {
        draftState[payload.user].avatar = payload.avatar;
      });
      return nextState;
    case CLEAR_STORE:
      return {};
    default:
      return state;
  };
};

export default userReducer;
