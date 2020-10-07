import React from 'react';
import { connect } from 'react-redux';

class PollDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        PollDetails
      </div>
    );
  }

}

const mapStateToProps = ({ polls, users }, props) => {
  const { id } = props;
  const poll = polls[id];
  const author = users[poll.author].username;

  return {
    id,
    poll,
    author,
  };
};

export default connect(mapStateToProps)(PollDetails);
