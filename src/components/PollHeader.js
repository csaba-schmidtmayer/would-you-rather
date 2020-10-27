import React from 'react';

const PollHeader = (props) => (
  <div className="poll-header">
    {
      props.text !== undefined
        ? props.text
        : 'Would you rather...?'
    }  
  </div>
);

export default PollHeader;
