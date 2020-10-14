import React from 'react';
import { connect } from 'react-redux';

const UnansweredOption = (props) => (
  <div
    className="poll-option"
    onClick={() => props.onChoice(props.option)}
  >
    {
      props.option === 'OptionTwo'
        ? (<div className="answer-left" />)
        : null
    }
    <span>{props.text}</span>
    {
      props.option === 'OptionOne'
        ? (<div className="answer-right" />)
        : null
    }
  </div>
);

export default UnansweredOption;
