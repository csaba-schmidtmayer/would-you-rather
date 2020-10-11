import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../../actions/userActions';

class UserPanel extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.dispatch(logout());
  }

  render() {
    return (
      <div className="user-panel">
        <div className="user-data">
          <span className="full-name">{this.props.name}</span>
          <span className="username">{this.props.username}</span>
        </div>
        <div className="divider">
          Manage profile
        </div>
        <div className="user-data-action-group">
          <div className="user-data-action">
            View profile
          </div>
          <div className="user-data-action">
            Change avatar
          </div>
          <div className="user-data-action">
            Change password
          </div>
        </div>
        <div className="user-data-action-group">
          <div
            className="user-data-action"
            onClick={this.logout}
          >
            Log out
          </div>
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

export default connect(mapStateToProps)(UserPanel);
