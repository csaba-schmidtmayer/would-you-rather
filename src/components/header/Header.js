import React from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import { logout } from '../../actions/userActions';
import avatars from '../../svg/avatars';
import caretDown from '../../svg/caret-down.svg';
import caretUp from '../../svg/caret-up.svg';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserPanelVisible: false
    };

    this.logout = this.logout.bind(this);
    this.handleUserPanel = this.handleUserPanel.bind(this);
  }

  logout() {
    this.props.dispatch(logout());
  }

  handleUserPanel() {
    this.setState((prevState) => ({
      ...prevState,
      isUserPanelVisible: !prevState.isUserPanelVisible
    }));
  }

  render() {
    return (
      <header id="main-header">
        <div className="header-left" />
        <Navbar />
        <div
          className="user-header"
          onClick={this.handleUserPanel}>
          <div className="user-interaction">
            <img
              className="main-header-icon"
              src={caretDown}
            />
            <img
              className="main-header-icon"
              src={avatars[this.props.avatar]}
            />
          </div>
          {this.state.isUserPanelVisible
            ? <div className="user-panel">
              <ul>
                <li>View profile</li>
                <li onClick={this.logout}>Logout: {this.props.username}</li>
              </ul>
            </div>
            : null
          }
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ activeUser }) => ({
  username: activeUser.username,
  name: activeUser.name,
  avatar: activeUser.avatar
});

export default connect(mapStateToProps)(Header);
