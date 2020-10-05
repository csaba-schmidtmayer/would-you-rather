import { POPULATE_POLLS, ADD_NEW_POLL, CLEAR_STORE } from '../constants/actionTypes';

const pollReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch(type) {
    case POPULATE_POLLS:
      const pollsAssocArr = {};
      payload.polls.forEach((poll) => {
        pollsAssocArr[poll.id] = {
          author: poll.author,
          optionOne: {
            text: poll.optionOne.text,
            numOfAnswers: poll.optionOne.numOfAnswers
          },
          optionTwo: {
            text: poll.optionTwo.text,
            numOfAnswers: poll.optionTwo.numOfAnswers
          },
          created: new Date(poll.created)
        };
      });
      return pollsAssocArr;
    case ADD_NEW_POLL:
      return {
        ...state,
        [payload.poll.id]: {
          author: payload.poll.author,
          optionOne: {
            text: payload.poll.optionOne.text,
            numOfAnswers: payload.poll.optionOne.numOfAnswers
          },
          optionTwo: {
            text: payload.poll.optionTwo.text,
            numOfAnswers: payload.poll.optionTwo.numOfAnswers
          },
          created: new Date(payload.poll.created)
        }
      };
    case CLEAR_STORE:
      return {};
    default:
      return state;
  };
};

export default pollReducer;
