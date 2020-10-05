import React from 'react';
import { connect } from 'react-redux';

import PollOverview from '../components/PollOverview';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <div>
          <p>Unanswered Polls</p>
          <div>
            {this.props.unansweredPolls.map((poll) => (
              <PollOverview
                key={poll.id}
                id={poll.id}
                optionOne={poll.optionOne}
                optionTwo={poll.optionTwo}
              />
            ))}
          </div>
        </div>
        <div>
          <p>Answered Polls</p>
          <div>
            {this.props.answeredPolls.map((poll) => (
              <PollOverview
                key={poll.id}
                id={poll.id}
                optionOne={poll.optionOne}
                optionTwo={poll.optionTwo}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ polls, activeUser }) => {
  const allPolls = Object.keys(polls).map((key) =>({
    id: key,
    optionOne: polls[key].optionOne.text,
    optionTwo: polls[key].optionTwo.text,
    answer: activeUser.answers[key] !== undefined
      ? activeUser.answers[key]
      : null
  }));
  const unansweredPolls = allPolls.filter((poll) => (poll.answer === null));
  const answeredPolls = allPolls.filter((poll) => (poll.answer !== null));
  return {
    unansweredPolls,
    answeredPolls
  };
};

export default connect(mapStateToProps)(Dashboard);
