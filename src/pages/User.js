import React from 'react';
import { connect } from 'react-redux';

import UserHeader from '../components/UserHeader';
import PollOverview from '../components/PollOverview';
import PollNotFound from './PollNotFound';

const User = (props) => (
  !props.userExists
    ? <PollNotFound />
    : (
      <>
        <div className="user">
          <UserHeader
            username={props.username}
            link="disabled"
          />
        </div>
        {
          props.polls.map((poll) => (
            <PollOverview
              key={poll.id}
              id={poll.id}
              optionOne={poll.optionOne}
              optionTwo={poll.optionTwo}
              answer={poll.answer}
            />
          ))
        }
      </>
    )
);

const mapStateToProps = ({ users, polls, activeUser }, props) => {
  const { username } = props.match.params;
  const userExists = users[username] === undefined
    ? false
    : true;
  const userPolls = userExists
    ? users[username].polls.map((pollId) => ({
      id: pollId,
      optionOne: polls[pollId].optionOne.text,
      optionTwo: polls[pollId].optionTwo.text,
      answer: activeUser.answers[pollId] !== undefined
        ? activeUser.answers[pollId]
        : null
    }))
    : [];
  return {
    username,
    userExists,
    polls: userPolls
  };
};

export default connect(mapStateToProps)(User);
