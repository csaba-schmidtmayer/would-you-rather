import React from 'react';

const PollOverview = (props) => (
  <div>
    <p>Would you rather...?</p>
    <p>{props.optionOne}</p>
    <p>{props.optionTwo}</p>
  </div>
);

export default PollOverview;
