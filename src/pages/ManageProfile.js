import React from 'react';
import { connect } from 'react-redux';

class ManageProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        MANAGE PROFILE
      </div>
    );
  }
}

export default connect()(ManageProfile);
