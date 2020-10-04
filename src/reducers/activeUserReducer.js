import { SET_ACTIVE_USER, DEL_ACTIVE_USER } from '../constants/actionTypes';

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
    case DEL_ACTIVE_USER:
      return null;
    default:
      return state;
  };
};

export default activeUserReducer;