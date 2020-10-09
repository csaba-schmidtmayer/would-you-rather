import { NEW_POLL, TAKE_POLL, POPULATE_POLLS, ADD_NEW_POLL, ANSWER_POLL, ANSWER_POLL_UPDATE, ANSWER_POLL_REVERT } from '../constants/actionTypes';
import makeActionCreator from './makeActionCreator';

export const newPoll = makeActionCreator(NEW_POLL, 'optionOne', 'optionTwo');
export const takePoll = makeActionCreator(TAKE_POLL, 'id', 'option');
export const populatePolls = makeActionCreator(POPULATE_POLLS, 'polls');
export const addNewPoll = makeActionCreator(ADD_NEW_POLL, 'poll');
export const answerPoll = makeActionCreator(ANSWER_POLL, 'id', 'option');

export const answerPollUpdate = (payload) => ({
  type: ANSWER_POLL_UPDATE,
  payload
});

export const answerpollRevert = (payload) => ({
  type: ANSWER_POLL_REVERT,
  payload
})
