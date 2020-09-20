import * as actions from '../userActions';
import * as types from '../../constants/actionTypes';

describe('user actions', () => {
  it('should create an action to log in', () => {
    const username = 'admin';
    const password = 'letMeIn!4!';
    const expectedAction = {
      type: types.LOGIN,
      payload: {
        username,
        password
      }
    };
    expect(actions.login(username, password)).toEqual(expectedAction);
  });
  it('should create an action to register a new user', () => {
    const username = 'admin';
    const name = 'Adam Minuteman';
    const avatar = 'male04';
    const password = 'letMeIn!4!';
    const expectedAction = {
      type: types.REGISTER,
      payload: {
        username,
        name,
        avatar,
        password
      }
    };
    expect(actions.register(username, name, avatar, password)).toEqual(expectedAction);
  });
});
