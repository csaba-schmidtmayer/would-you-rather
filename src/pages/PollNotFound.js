import React from 'react';
import  { useHistory } from 'react-router-dom';

import PollHeader from '../components/PollHeader';
import UnansweredOption from '../components/UnansweredOption';

const PollNotFound = (props) => {
  let history = useHistory();
  return (
    <div className="poll-nav">
      <PollHeader
        text="Uh-oh, this page does not exist. Would you rather...?"
      />
      <div className="poll-options">
        <UnansweredOption
          text="go to the dashboard"
          option="OptionOne"
          onChoice={() => {history.replace('/')}}
        />
        <div className="poll-divider-container">
          <span className="poll-divider">or</span>
        </div>
        <a href="https://www.youtube.com/watch?v=1s58rW0_LN4&ab_channel=BobRoss">
          <UnansweredOption
            text="watch the paint dry"
            option="OptionTwo"
          />
        </a>
       </div>
    </div>
  );
};

export default PollNotFound;
