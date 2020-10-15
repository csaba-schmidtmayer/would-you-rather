import React from 'react';

const AnsweredOption = (props) => (
  <div className="poll-option answered">
    {
      props.chosen && props.option === 'OptionTwo'
        ? (<div className="answer-left" />)
        : null
    }
    <div className="poll-option-data">
      <span className="answer-text">
        {props.text}
      </span>
      <span className="number-of-answers">
        {`${props.number === 0 ? 'Nobody' : props.number + ' user'}${props.number > 1 ? 's' : ''} chose this option (${props.percentage}%)`}
      </span>
    </div>
    {
      props.chosen && props.option === 'OptionOne'
        ? (<div className="answer-right" />)
        : null
    }
  </div>
);

export default AnsweredOption;
