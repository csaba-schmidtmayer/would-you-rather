import React from 'react';
import { connect } from 'react-redux';

import AvatarPicker from '../components/AvatarPicker';

class ManageProfile extends React.Component {
  constructor(props) {
    super(props);

    this.handleAvatarChange = this.handleAvatarChange.bind(this);
  }

  handleAvatarChange(avatar) {
    console.log(avatar);
  }

  render() {
    return (
      <AvatarPicker
        onChange={this.handleAvatarChange}
      />
    );
  }
}

export default connect()(ManageProfile);
