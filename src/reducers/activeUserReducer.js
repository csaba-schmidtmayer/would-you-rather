import { SET_ACTIVE_USER } from '../constants/actionTypes';

const activeUserReducer = (state = null, action) => {
  const { type, payload } = action;
  switch(type) {
    case SET_ACTIVE_USER:
      const answers = {};
      payload.activeUser.answers.forEach((answer) => {
        answers[answer.pollId] = answer.option;
      });
      return {
        username: payload.activeUser.username,
        name: payload.activeUser.name,
        avatar: payload.activeUser.avatar,
        answers
      };
    default:
      return state;
  };
};

export default activeUserReducer;
