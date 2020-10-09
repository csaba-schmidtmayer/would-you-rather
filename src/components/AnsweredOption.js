import React from 'react';

const AnsweredOption = (props) => (
  <div>
    {props.chosen ? <p>Your choice</p> : null}
    <p>{props.text}</p>
    <p>{props.number === 0 ? `Nobody` : `${props.number} user${props.number > 1 ? 's' : ''}`} chose this option</p>
    <p>{props.percentage}%</p>
  </div>
);

export default AnsweredOption;
