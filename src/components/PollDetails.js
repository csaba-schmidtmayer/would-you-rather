import React from 'react';
import { connect } from 'react-redux';

import CreatedBy from '../components/CreatedBy';
import UnansweredOption from '../components/UnansweredOption';
import AnsweredOption from '../components/AnsweredOption';

class PollDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CreatedBy author={this.props.author} />
        {this.props.hasBeenAnswered
          ? (
            <div>
              <AnsweredOption />
              <AnsweredOption />
            </div>
          )
          : (
            <div>
              <UnansweredOption />
              <UnansweredOption />
            </div>
          )
        }
      </div>
    );
  }

}

const mapStateToProps = ({ polls, users, activeUser }, props) => {
  const { id } = props;
  const poll = polls[id];
  const author = users[poll.author].username;

  return {
    id,
    poll,
    author,
    hasBeenAnswered: (activeUser.answers[id] === undefined)
      ? false
      : true
  };
};

export default connect(mapStateToProps)(PollDetails);
