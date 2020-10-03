import { REGISTER, POPULATE_USERS } from '../constants/actionTypes';

const userReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch(type) {
    case REGISTER:
      return ({
        ...state,
        [payload.username]: {
          username: payload.username,
          name: payload.name,
          avatar: payload.avatar,
          answers: {},
          questions: []
        }
      });
    case POPULATE_USERS:
      const usersAssocArr = {};
      payload.users.forEach((user) => {
        usersAssocArr[user.username] = {
          username: user.username,
          name: user.name,
          avatar: user.avatar
        };
      });
      return usersAssocArr;
    default:
      return state;
  };
};

export default userReducer;
