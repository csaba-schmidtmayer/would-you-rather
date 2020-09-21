import * as actions from '../pollActions';
import * as types from '../../constants/actionTypes';

describe('poll actions', () => {
  it('should create an action to add a new poll', () => {
    const expectedAction = {
      type: types.NEW_POLL,
      payload: {
        optionOne: 'be a Jedi',
        optionTwo: 'be a Sith'
      }
    };
    expect(actions.newPoll(optionOne, optionTwo))
      .toEqual(expectedAction);
  });

  it('should create an action to vote on a poll', () => {
    const expectedAction = {
      type: types.TAKE_POLL,
      payload: {
        id: '13',
        option: 'optionTwo'
      }
    };
    expect(actions.takePoll(id, option))
      .toEqual(expectedAction);
  });
});
