import { NEW_POLL, TAKE_POLL, POPULATE_POLLS } from '../constants/actionTypes';
import makeActionCreator from './makeActionCreator';

export const newPoll = makeActionCreator(NEW_POLL, 'optionOne', 'optionTwo');
export const takePoll = makeActionCreator(TAKE_POLL, 'id', 'option');
export const populatePolls = makeActionCreator(POPULATE_POLLS, 'polls');
