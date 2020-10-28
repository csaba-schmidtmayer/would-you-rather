import React from 'react';
import { connect } from 'react-redux';

import { clearDbMsg } from '../actions/dbMsgActions';
import { SUCCESS } from '../constants/const';
import PollDetails from '../components/PollDetails';
import PollNotFound from './PollNotFound';

const SinglePoll = (props) => {
  if (props.dbMsg.msgText === SUCCESS) {
    props.dispatch(clearDbMsg());
  }
  return (
    props.pollExists
      ? <PollDetails id={props.id} />
      : <PollNotFound />
  );
};

const mapStateToProps = ({ polls, dbMsg }, props) => {
  const { id } = props.match.params;
  return {
    id,
    dbMsg,
    pollExists: (polls[id] === undefined)
      ? false
      : true,
  }
};

export default connect(mapStateToProps)(SinglePoll);
