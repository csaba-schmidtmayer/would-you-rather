import { POPULATE_POLLS } from '../constants/actionTypes';

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
    default:
      return state;
  };
};

export default pollReducer;
