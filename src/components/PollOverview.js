import React from 'react';
import { Link } from 'react-router-dom';

const PollOverview = (props) => (
  <Link to={`/polls/${props.id}`}>
    <div>
      <p>Would you rather...?</p>
      <p>{props.optionOne}</p>
      <p>{props.optionTwo}</p>
    </div>
  </Link>
);

export default PollOverview;
