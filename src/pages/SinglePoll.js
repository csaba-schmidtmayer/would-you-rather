import React from 'react';
import { connect } from 'react-redux';

import PollDetails from '../components/PollDetails';
import PollNotFound from './PollNotFound';

const SinglePoll = (props) => (
  props.pollExists
    ? <PollDetails id={props.id} />
    : <PollNotFound />
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
