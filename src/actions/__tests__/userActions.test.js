import * as actions from '../userActions';
import * as types from '../../constants/actionTypes';

describe('user actions', () => {
  it('should create an action to log in', () => {
    const expectedAction = {
      type: types.LOGIN,
      payload: {
        username: 'admin',
        password: 'letMeIn!4!'
      }
    };
    expect(actions.login('admin', 'letMeIn!4!'))
      .toEqual(expectedAction);
  });

  it('should create an action to register a new user', () => {
    const expectedAction = {
      type: types.REGISTER,
      payload: {
        username: 'admin',
        name: 'Adam Minuteman',
        avatar: 'male04',
        password: 'letMeIn!4!'
      }
    };
    expect(actions.register('admin', 'Adam Minuteman', 'male04', 'letMeIn!4!'))
      .toEqual(expectedAction);
  });
});
