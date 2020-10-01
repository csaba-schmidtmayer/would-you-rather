import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../actions/userActions';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.dispatch(logout());
  }

  render() {
    return (
      <div className="header">
        <Link to="/">
          Dashboard
        </Link>
        <Link to="/leaderboard">
          Leaderboard
        </Link>
        <Link to="/add">
          New poll
        </Link>
        <div className="user-interaction">
          {/* Avatar placeholder */}
          <ul>
            <li>View profile</li>
            <li onClick={this.logout}>Logout: {this.props.username}</li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ activeUser }) => ({
  username: activeUser.username,
  name: activeUser.name,
  avatar: activeUser.avatar
});

export default connect(mapStateToProps)(Header);
