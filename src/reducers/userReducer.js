import { REGISTER } from '../constants/actionTypes';

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
      default:
        return state;
  };
};

export default userReducer;
