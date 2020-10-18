import React from 'react';
import { Link } from 'react-router-dom';

import PollHeader from './PollHeader';

const PollOverview = (props) => (
  <div className="poll-overview">
    <Link to={`/polls/${props.id}`}>
      <PollHeader />
      <div className="poll-options">
        <div className="poll-option">
          <span>{props.optionOne}</span>
          <div className={`answer-right${props.answer === 'OptionOne' ? '' : ' hidden'}`} />
        </div>
        <div className="poll-divider-container">
          <span className="poll-divider">or</span>
        </div>
        <div className="poll-option">
          <div className={`answer-left${props.answer === 'OptionTwo' ? '' : ' hidden'}`} />
          <span>{props.optionTwo}</span>
        </div>
      </div>
    </Link>
  </div>
);

export default PollOverview;
