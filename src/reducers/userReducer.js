import { POPULATE_USERS, CLEAR_STORE } from '../constants/actionTypes';

const userReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch(type) {
    case POPULATE_USERS:
      const usersAssocArr = {};
      payload.users.forEach((user) => {
        usersAssocArr[user.username] = {
          username: user.username,
          name: user.name,
          avatar: user.avatar,
          numOfPolls: user.numOfPolls,
          numOfAnswers: user.numOfAnswers
        };
      });
      return usersAssocArr;
    case CLEAR_STORE:
      return {};
    default:
      return state;
  };
};

export default userReducer;
