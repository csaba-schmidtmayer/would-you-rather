import React from 'react';
import { connect } from 'react-redux';

import { login } from '../actions/userActions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
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

  render() {
    return (
      <div>
        {this.props.errorMsg !== '' ? <p>{this.props.errorMsg}</p> : null}
        <form onSubmit={this.handleLoginSubmit}>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleFormChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleFormChange}
          />
          <button type="submit">
            Log in
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ dbMsg }) => ({
  errorMsg: dbMsg.msgText
});

export default connect(mapStateToProps)(Login);
