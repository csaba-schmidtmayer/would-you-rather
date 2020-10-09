import React from 'react';

const User = (props) => (
  <div>
    <p>{props.place}</p>
    <p>Placeholder of {props.avatar}</p>
    <p>{props.name}</p>
    <p>{props.username}</p>
    <p>{`Submitted ${props.numOfPolls === 0 ? 'no polls yet' : props.numOfPolls + ' poll'}${props.numOfPolls > 1 ? 's' : ''}: ${props.pollPoints} p.`}</p>
    <p>{`Answered ${props.numOfAnswers === 0 ? 'no polls yet' : props.numOfAnswers + ' poll'}${props.numOfAnswers > 1 ? 's' : ''}: ${props.answerPoints} p.`}</p>
    <p>Total: {props.pollPoints + props.answerPoints}</p>
  </div>
);

export default User;
