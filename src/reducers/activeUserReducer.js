import { SET_ACTIVE_USER } from '../constants/actionTypes';

const activeUserReducer = (state = {activeUser: null}, action) => {
  const { type, payload } = action;
  switch(type) {
    case SET_ACTIVE_USER:
      return (payload.activeUser);
    default:
      return state;
  };
};

export default activeUserReducer;
