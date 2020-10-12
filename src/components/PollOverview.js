import React from 'react';
import { Link } from 'react-router-dom';

const PollOverview = (props) => (
  <Link to={`/polls/${props.id}`}>
    <div className="poll-overview">
      <div className="poll-overview-header">
        Would you rather...?
      </div>
      <div className="poll-overview-options">
        <span>{props.optionOne}</span>
        <span className="poll-overview-divider">or</span>
        <span>{props.optionTwo}</span>
      </div>
    </div>
  </Link>
);

export default PollOverview;
