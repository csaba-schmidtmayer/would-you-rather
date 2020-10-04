import { SET_ACTIVE_USER, CLEAR_STORE } from '../constants/actionTypes';

const activeUserReducer = (state = null, action) => {
  const { type, payload } = action;
  switch(type) {
    case SET_ACTIVE_USER:
      const answers = {};
      payload.activeUser.answers.forEach((answer) => {
        answers[answer.pollId] = answer.option;
      });
      return {
        username: payload.activeUser.userData.username,
        name: payload.activeUser.userData.name,
        avatar: payload.activeUser.userData.avatar,
        answers
      };
    case CLEAR_STORE:
      return null;
    default:
      return state;
  };
};

export default activeUserReducer;
