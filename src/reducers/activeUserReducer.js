import produce from 'immer';

import { SET_ACTIVE_USER, ANSWER_POLL_UPDATE, ANSWER_POLL_REVERT, CLEAR_STORE } from '../constants/actionTypes';

const activeUserReducer = (state = null, action) => {
  const { type, payload } = action;
  let nextState;
  switch(type) {
    case SET_ACTIVE_USER:
      const answers = {};
      payload.activeUser.answers.forEach((answer) => {
        answers[answer.id] = answer.option;
      });
      return {
        username: payload.activeUser.userData.username,
        name: payload.activeUser.userData.name,
        avatar: payload.activeUser.userData.avatar,
        answers
      };
    case ANSWER_POLL_UPDATE:
      nextState = produce(state, draftState => {
        draftState.answers[payload.id] = payload.option;
      });
      return nextState;
    case ANSWER_POLL_REVERT:
      nextState = produce(state, draftState => {
        delete draftState.answers[payload.id];
      });
      return nextState;
    case CLEAR_STORE:
      return null;
    default:
      return state;
  };
};

export default activeUserReducer;
