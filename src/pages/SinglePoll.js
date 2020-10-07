import React from 'react';
import { connect } from 'react-redux';

import PollDetails from '../components/PollDetails';

const SinglePoll = (props) => (
  !props.pollExists
    ? <div>
      <p>The poll does not exist.</p>
    </div>
    : <PollDetails id={props.id} />
);

const mapStateToProps = ({ polls }, props) => {
  const { id } = props.match.params;
  return {
    id,
    pollExists: (polls[id] === undefined)
      ? false
      : true,
  }
};

export default connect(mapStateToProps)(SinglePoll);
