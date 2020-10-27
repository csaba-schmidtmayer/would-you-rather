import React, { useState } from 'react';

import PollHeader from '../components/PollHeader';
import UnansweredOption from '../components/UnansweredOption';
import Login from './Login';

const PollLogin = (props) => {
  const [ isLoginChosen, setIsLoginChosen ] = useState(false);

  return (
    isLoginChosen
      ? <Login />
      : (
        <div className="poll-nav">
          <PollHeader
            text="Oops, it seems that you are not logged in. Would you rather...?"
          />
          <div className="poll-options">
            <UnansweredOption
              text="log in"
              option="OptionOne"
              onChoice={() => {setIsLoginChosen(true)}}
            />
            <div className="poll-divider-container">
              <span className="poll-divider">or</span>
            </div>
            <a href="https://www.youtube.com/watch?v=SB-qEYVdvXA&ab_channel=FunnyVideos">
              <UnansweredOption
                text="watch a cute cat video"
                option="OptionTwo"
              />
            </a>
           </div>
        </div>
      )
  );
};

export default PollLogin;
