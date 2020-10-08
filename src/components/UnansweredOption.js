import React from 'react';
import { connect } from 'react-redux';

const UnansweredOption = (props) => (
  <div onClick={() => props.onChoice(props.option)}>
    <p>{props.text}</p>
  </div>
);

export default UnansweredOption;
