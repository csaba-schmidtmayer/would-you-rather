import React from 'react';
import { Link } from 'react-router-dom';

const PollOverview = (props) => (
  <div className="poll-overview">
    <Link to={`/polls/${props.id}`}>
      <div className="poll-header">
        Would you rather...?
      </div>
      <div className="poll-options">
        <div className="poll-option">
          <span>{props.optionOne}</span>
          <div className={`answer-right${props.answer === 'OptionOne' ? '' : ' hidden'}`} />
        </div>
        <span className="poll-divider">or</span>
        <div className="poll-option">
          <div className={`answer-left${props.answer === 'OptionTwo' ? '' : ' hidden'}`} />
          <span>{props.optionTwo}</span>
        </div>
      </div>
    </Link>
  </div>
);

export default PollOverview;
