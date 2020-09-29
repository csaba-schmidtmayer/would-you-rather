import * as actions from '../dbMsgActions';
import * as types from '../../constants/actionTypes';

describe('database message actions', () => {
  it('should create an action to set a database message', () => {
    const expectedAction = {
      type: types.SET_DB_MSG,
      payload: {
        dbMsg: 'SUCCESS'
      }
    };
    expect(actions.setDbMsg('SUCCESS'))
      .toEqual(expectedAction);
  });

  it('should create an action to clear the database message', () => {
    const expectedAction = {
      type: types.CLEAR_DB_MSG
    };
    expect(actions.clearDbMsg())
      .toEqual(expectedAction);
  });
});
