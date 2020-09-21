import reducer from '../userReducer';
import * as types from '../../constants/actionTypes';

const initialState = {
  admin: {
    username: 'admin',
    name: 'Adam Minuteman',
    avatar: 'male04',
    answers: {
      '2': 'optionOne',
      '6': 'optionTwo'
    },
    questions: [
      '1', '4', '5'
    ]
  }
};

describe('user reducer', () => {
  const registerAction = {
    type: types.REGISTER,
    payload: {
      username: 'johndoe',
      name: 'John Doe',
      avatar: 'male01'
    }
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual({});
  });

  it('should handle REGISTER', () => {
    expect(reducer({}, registerAction))
      .toEqual({
        johndoe: {
          username: 'johndoe',
          name: 'John Doe',
          avatar: 'male01',
          answers: {},
          questions: []
        }
      });

    expect(reducer(initialState, registerAction))
      .toEqual({
        admin: {
          username: 'admin',
          name: 'Adam Minuteman',
          avatar: 'male04',
          answers: {
            '2': 'optionOne',
            '6': 'optionTwo'
          },
          questions: [
            '1', '4', '5'
          ]
        },
        johndoe: {
          username: 'johndoe',
          name: 'John Doe',
          avatar: 'male01',
          answers: {},
          questions: []
        }
      });
  });
});
