import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { login } from '../actions/userActions';
import InputField from '../components/InputField';
import { ReactComponent as EyeClosed } from '../svg/eye-closed.svg';
import { ReactComponent as EyeOpen } from '../svg/eye-open.svg';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      isPwdVisible: false
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.togglePwdVisibility = this.togglePwdVisibility.bind(this);
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    this.props.dispatch(login(this.state.username, this.state.password));
  }

  handleFormChange(event) {
    const target = event.target;
    event.preventDefault();
    this.setState((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  }

  togglePwdVisibility() {
    this.setState((prevState) => ({
      ...prevState,
      isPwdVisible: !prevState.isPwdVisible
    }));
  }

  render() {
    return (
      <div className="login">
        <div className="login-header">
          Login
        </div>
        <div className="login-input">
          <InputField
            name="username"
            type="text"
            value={this.state.username}
            placeholder={'Enter your username'}
            onChange={this.handleFormChange}
          />
          <InputField
            name="password"
            type={this.state.isPwdVisible ? 'text' : 'password'}
            value={this.state.password}
            placeholder={'Enter your password'}
            onChange={this.handleFormChange}
            trailIconComp={
              this.state.isPwdVisible
                ? <EyeOpen onClick={this.togglePwdVisibility} />
                : <EyeClosed onClick={this.togglePwdVisibility} />
            }
          />
        </div>
        <div className="input-submit">
          <button
            disabled={this.state.username === '' || this.state.password === ''}
            onClick={this.handleLoginSubmit}
          >
            Log in
          </button>
        </div>
        <div className="login-register">
          <p>
            {`No account? `}
            <Link to="/register">
              Register.
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ dbMsg }) => ({
  errorMsg: dbMsg.msgText
});

export default connect(mapStateToProps)(Login);
