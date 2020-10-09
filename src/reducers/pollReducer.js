import produce from 'immer';

import { POPULATE_POLLS, ADD_NEW_POLL, ANSWER_POLL_UPDATE, ANSWER_POLL_REVERT, CLEAR_STORE } from '../constants/actionTypes';

//TODO: refactor to use a Poll class

const parseOption = (option) => (
  option.substr(0, 1).toLowerCase() + option.substr(1)
);

const pollReducer = (state = {}, action) => {
  const { type, payload } = action;
  let nextState;
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
    case ANSWER_POLL_UPDATE:
      nextState = produce(state, draftState => {
        draftState[payload.id][parseOption(payload.option)].numOfAnswers += 1;
      });
      return nextState;
    case ANSWER_POLL_REVERT:
    nextState = produce(state, draftState => {
      draftState[payload.id][parseOption(payload.option)].numOfAnswers -= 1;
    });
    return nextState;
    case CLEAR_STORE:
      return {};
    default:
      return state;
  };
};

export default pollReducer;
