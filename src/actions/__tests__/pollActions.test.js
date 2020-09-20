import * as actions from '../pollActions';
import * as types from '../../constants/actionTypes';

describe('poll actions', () => {
  it('should create an action to add a new poll', () => {
    const optionOne = 'be a Jedi';
    const optionTwo = 'be a Sith';
    const expectedAction = {
      type: types.NEW_POLL,
      payload: {
        optionOne,
        optionTwo
      }
    };
    expect(actions.newPoll(optionOne, optionTwo)).toEqual(expectedAction);
  });
  it('should create an action to vote on a poll', () => {
    const id = '13';
    const option = 'optionTwo';
    const expectedAction = {
      type: types.TAKE_POLL,
      payload: {
        id,
        option
      }
    };
    expect(actions.takePoll(id, option)).toEqual(expectedAction);
  });
});
