import React from 'react';

import UserHeader from './UserHeader';

const mapOutPoints = (categories) => {
  const withTotal = [
    ...categories,
    {
      text: 'Total',
      point: categories.reduce((acc, curr) => (acc + curr.point), 0)
    }
  ];
  return withTotal.map((category) => (
    <div
      className={`stat-row${category.text === 'Total' ? ' total-row' : ''}`}
      key={category.text.toLowerCase()}
    >
      <span>
        {category.text === 'Total'
          ? `${category.text}: `
          : `${category.text} ${category.number === 0 ? 'no polls yet' : category.number + ' poll'}${category.number > 1 ? 's' : ''}: `
        }
        </span>
      <span>
        {category.point}
      </span>
      <span>
        {` ${category.point === 1 ? 'point' : 'points'}`}
      </span>
    </div>
  ))
};

const User = (props) => {
  const categories = [
    {
      text: 'Submitted',
      number: props.numOfPolls,
      point: props.pollPoints
    },
    {
      text: 'Answered',
      number: props.numOfAnswers,
      point: props.answerPoints
    }
  ];
  return (
    <div className="user">
      <UserHeader
        username={props.username}
        additionalInfo={`User rank: ${props.place}`}
      />
      <div className="stat-header">
        User statistics
      </div>
      <div className="stat-rows">
        {mapOutPoints(categories)}
      </div>
    </div>
  );
};

export default User;
