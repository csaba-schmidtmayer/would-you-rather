import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { register } from '../actions/userActions';
import { SUCCESS } from '../constants/const';

class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      usernameError: '',
      name: '',
      nameError: '',
      passwordOne: '',
      passwordTwo: '',
      isPasswordVisible: false,
      passwordError: '',
      avatar: 'male01',
    };

    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handlePasswordToggle = this.handlePasswordToggle.bind(this);
  }

  handleRegisterSubmit(event) {
    event.preventDefault();
    const { username, name, passwordOne, passwordTwo, avatar } = this.state;
    const errorMsgs = {
      usernameError: username === ''
        ? 'Username cannot be left empty.'
        : '',
      nameError: name === ''
        ? 'Name cannot be left empty.'
        : '',
      passwordError: (passwordOne === '' || passwordTwo === '')
        ? 'Password cannot be left empty.'
        : (passwordOne !== passwordTwo)
          ? 'Passwords do not match.'
          : ''
    };
    this.setState((prevState) => ({
      ...prevState,
      ...errorMsgs
    }));
    if (errorMsgs.usernameError === '' && errorMsgs.nameError === '' && errorMsgs.passwordError === '') {
      this.props.dispatch(register(username, name, avatar, passwordOne));
    }
  }

  handleFormChange(event) {
    const target = event.target;
    event.preventDefault();
    this.setState((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  }

  handlePasswordToggle(event) {
    event.preventDefault();
    this.setState((prevState) => ({
      ...prevState,
      isPasswordVisible: !prevState.isPasswordVisible
    }));
  }

  render() {
    const { username, usernameError, name, nameError, passwordOne, passwordTwo, isPasswordVisible, passwordError, avatar } = this.state;
    const { dbMsg } = this.props;
    return (
      (dbMsg.msgText === SUCCESS)
        ? <Redirect to="/" />
        : <div>
          {dbMsg.msgText ? <p>{dbMsg.msgText}</p> : null}
          <form onSubmit={this.handleRegisterSubmit}>
            {usernameError ? <p>{usernameError}</p> : null}
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={this.handleFormChange}
            />
            {nameError ? <p>{nameError}</p> : null}
            <input
              name="name"
              type="text"
              placeholder="Full name"
              value={name}
              onChange={this.handleFormChange}
            />
            {passwordError ? <p>{passwordError}</p> : null}
            <input
              name="passwordOne"
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={passwordOne}
              onChange={this.handleFormChange}
            />
            <input
              name="passwordTwo"
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Confirm password"
              value={passwordTwo}
              onChange={this.handleFormChange}
            />
            <button onClick={this.handlePasswordToggle}>
              {isPasswordVisible ? 'Hide password' : 'Show password'}
            </button>
            <button type="submit">
              Register
            </button>
          </form>
        </div>
    );
  }
}

const mapStateToProps = ({ dbMsg }) => ({
  dbMsg
});

export default connect(mapStateToProps)(Register);
