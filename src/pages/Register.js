import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { register } from '../actions/userActions';
import { SUCCESS } from '../constants/const';
import AvatarPicker from '../components/AvatarPicker';
import InputField from '../components/InputField';
import { ReactComponent as EyeClosed } from '../svg/eye-closed.svg';
import { ReactComponent as EyeOpen } from '../svg/eye-open.svg';

class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      avatar: '',
      username: '',
      usernameError: undefined,
      name: '',
      nameError: undefined,
      passwordOne: {
        value: '',
        isPwdVisible: false
      },
      passwordTwo: {
        value: '',
        isPwdVisible: false
      },
      passwordError: {
        passwordOne: undefined,
        passwordTwo: undefined
      }
    };

    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.togglePwdVisibility = this.togglePwdVisibility.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleAvatarChange(avatar) {
    this.setState((prevState) => ({
      ...prevState,
      avatar: avatar
    }));
  }

  handleRegisterSubmit(event) {
    event.preventDefault();
    const { username, name, passwordOne, passwordTwo, avatar } = this.state;
    const emptyPwdErrorMsg = 'Password cannot be left empty.';
    const errorMsgs = {
      usernameError: username === ''
        ? 'Username cannot be left empty.'
        : undefined,
      nameError: name === ''
        ? 'Name cannot be left empty.'
        : undefined,
      passwordError: (passwordOne.value === '' && passwordTwo.value === '')
        ? {
          passwordOne: emptyPwdErrorMsg,
          passwordTwo: emptyPwdErrorMsg
        }
        : (passwordOne.value === '')
          ? {
            passwordOne: emptyPwdErrorMsg,
            passwordTwo: undefined
          }
          : (passwordTwo.value === '')
            ? {
              passwordOne: undefined,
              passwordTwo: emptyPwdErrorMsg
            }
            : (passwordOne.value !== passwordTwo.value)
              ? {
                passwordOne: undefined,
                passwordTwo: 'Passwords do not match.'
              }
              : {
                passwordOne: undefined,
                passwordTwo: undefined
              }
    };
    console.log(errorMsgs);
    if (
      errorMsgs.usernameError === undefined &&
      errorMsgs.nameError === undefined &&
      errorMsgs.passwordError.passwordOne === undefined &&
      errorMsgs.passwordError.passwordTwo === undefined
    ) {
      this.props.dispatch(register(username, name, avatar, passwordOne.value));
    }
    this.setState((prevState) => ({
      ...prevState,
      ...errorMsgs
    }));
  }

  handleFormChange(event) {
    const target = event.target;
    event.preventDefault();
    this.setState((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  }

  togglePwdVisibility(inputId) {
    this.setState((prevState) => ({
      ...prevState,
      [inputId]: {
        ...prevState[inputId],
        isPwdVisible: !prevState[inputId].isPwdVisible
      }
    }));
  }

  handlePasswordChange(event) {
    const target = event.target;
    event.preventDefault();
    this.setState((prevState) => ({
      ...prevState,
      [target.name]: {
        ...prevState[target.name],
        value: target.value
      }
    }));
  }

  cancel() {
    this.props.history.push('/');
  }

  render() {
    const { dbMsg } = this.props;
    return (
      (dbMsg.msgText === SUCCESS)
        ? <Redirect to="/" />
        : (
          <div className="register">
            <div className="register-header">
              Register
            </div>
            <div className="register-input">
              <AvatarPicker
                onChange={this.handleAvatarChange}
              />
              <InputField
                name="username"
                type="text"
                placeholder="Enter a username"
                warning={this.state.usernameError}
                value={this.state.username}
                onChange={this.handleFormChange}
              />
              <InputField
                name="name"
                type="text"
                placeholder="Enter your full name"
                warning={this.state.nameError}
                value={this.state.name}
                onChange={this.handleFormChange}
              />
              <InputField
                name="passwordOne"
                type={this.state.passwordOne.isPwdVisible ? 'text' : 'password'}
                value={this.state.passwordOne.value}
                placeholder="Enter your password"
                warning={this.state.passwordError.passwordOne}
                onChange={this.handlePasswordChange}
                trailIconComp={
                  this.state.passwordOne.isPwdVisible
                    ? <EyeOpen onClick={() => this.togglePwdVisibility('passwordOne')} />
                    : <EyeClosed onClick={() => this.togglePwdVisibility('passwordOne')} />
                }
              />
              <InputField
                name="passwordTwo"
                type={this.state.passwordTwo.isPwdVisible ? 'text' : 'password'}
                value={this.state.passwordTwo.value}
                placeholder="Confirm your password"
                warning={this.state.passwordError.passwordTwo}
                onChange={this.handlePasswordChange}
                trailIconComp={
                  this.state.passwordTwo.isPwdVisible
                    ? <EyeOpen onClick={() => this.togglePwdVisibility('passwordTwo')} />
                    : <EyeClosed onClick={() => this.togglePwdVisibility('passwordTwo')} />
                }
              />
            </div>
            <div className="input-submit">
              <button
                onClick={this.handleRegisterSubmit}
              >
                Register
              </button>
              <button
                onClick={this.cancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )
    );
  }
}

const mapStateToProps = ({ dbMsg }) => ({
  dbMsg
});

export default connect(mapStateToProps)(Register);
