import React from 'react';

import avatars from '../svg/avatars';

const User = (props) => (
  <div>
    <p>{props.place}</p>
    <img src={avatars[props.avatar]} width="100px" height="100px" />
    <p>{props.name}</p>
    <p>{props.username}</p>
    <p>{`Submitted ${props.numOfPolls === 0 ? 'no polls yet' : props.numOfPolls + ' poll'}${props.numOfPolls > 1 ? 's' : ''}: ${props.pollPoints} p.`}</p>
    <p>{`Answered ${props.numOfAnswers === 0 ? 'no polls yet' : props.numOfAnswers + ' poll'}${props.numOfAnswers > 1 ? 's' : ''}: ${props.answerPoints} p.`}</p>
    <p>Total: {props.pollPoints + props.answerPoints}</p>
  </div>
);

export default User;
