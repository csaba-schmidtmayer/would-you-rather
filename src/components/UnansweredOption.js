import React from 'react';

const UnansweredOption = (props) => (
  <div
    className="poll-option unanswered"
    onClick={() => props.onChoice(props.option)}
  >
    {
      props.option === 'OptionTwo'
        ? (<div className="answer-left" />)
        : null
    }
    <span className="answer-text">
      {props.text}
    </span>
    {
      props.option === 'OptionOne'
        ? (<div className="answer-right" />)
        : null
    }
  </div>
);

export default UnansweredOption;
