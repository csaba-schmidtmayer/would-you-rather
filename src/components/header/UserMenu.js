import React from 'react';
import { connect } from 'react-redux';

import UserPanel from './UserPanel';
import avatars from '../../svg/avatars';
import caretDown from '../../svg/caret-down.svg';
import caretUp from '../../svg/caret-up.svg';

class UserMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserPanelVisible: false
    };

    this.handleUserPanel = this.handleUserPanel.bind(this);
  }

  handleUserPanel() {
    this.setState((prevState) => ({
      ...prevState,
      isUserPanelVisible: !prevState.isUserPanelVisible
    }));
  }

  render() {
    return (
      <div
        className="user-menu"
        onClick={this.handleUserPanel}>
        <div className="user-interaction">
          <img
            className="main-header-icon"
            src={this.state.isUserPanelVisible ? caretUp : caretDown}
            alt=""
          />
          <img
            className="main-header-icon"
            src={avatars[this.props.avatar]}
            alt="The avatar of the active user"
          />
        </div>
        {this.state.isUserPanelVisible
          ? <UserPanel />
          : null
        }
      </div>
    );
  }
}

const mapStateToProps = ({ activeUser }) => ({
  avatar: activeUser.avatar
});

export default connect(mapStateToProps)(UserMenu);
