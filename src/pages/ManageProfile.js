import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import AvatarPicker from '../components/AvatarPicker';
import { changeAvatar } from '../actions/userActions';

class ManageProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAvatar: ''
    };

    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleAvatarSubmit = this.handleAvatarSubmit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleAvatarChange(avatar) {
    this.setState((prevState) => ({
      ...prevState,
      selectedAvatar: avatar
    }));
  }

  handleAvatarSubmit() {
    this.props.dispatch(changeAvatar(this.state.selectedAvatar));
  }

  cancel() {
    this.props.history.push('/');
  }

  render() {
    const { field } = this.props.match.params;
    return (
      <div className="manage-profile">
        {
          field === 'avatar'
            ? (
              <Fragment>
                <div className="manage-header">
                  Change avatar
                </div>
                <AvatarPicker
                  onLoad={this.handleAvatarChange}
                  onChange={this.handleAvatarChange}
                />
                <div className="input-submit">
                  <button
                    disabled={this.state.selectedAvatar === ''}
                    onClick={this.handleAvatarSubmit}
                  >
                    Change avatar
                  </button>
                  <button
                    onClick={this.cancel}
                  >
                    Cancel
                  </button>
                </div>
              </Fragment>
            )
            : null
        }
      </div>
    );
  }
}

export default connect()(ManageProfile);
