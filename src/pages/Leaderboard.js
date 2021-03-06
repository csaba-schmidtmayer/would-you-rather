import React from 'react';
import { connect } from 'react-redux';

import LeaderboardUser from '../components/LeaderboardUser';
import { POLL_VALUE, ANSWER_VALUE } from '../constants/const';

class Leaderboard extends React.Component {
  render() {
    return (
      <div>
        {this.props.users.map((user, index) =>(
          <LeaderboardUser
            key={user.username}
            place={user.place}
            username={user.username}
            numOfPolls={user.numOfPolls}
            pollPoints={user.numOfPolls * POLL_VALUE}
            numOfAnswers={user.numOfAnswers}
            answerPoints={user.numOfAnswers * ANSWER_VALUE}
          />
        ))}
      </div>
    );
  }
}

const calcTotalPoints = (user) => (
  user.polls.length * POLL_VALUE + user.numOfAnswers * ANSWER_VALUE
)

const mapStateToProps = ({ users }) => {
  const sortedUsers = Object.keys(users)
    .map((key) => (Object.assign({}, users[key])))
    .sort((a, b) => (calcTotalPoints(b) - calcTotalPoints(a)))
    .map((user, index, array) => {
      // Assign numOfPolls, place
      user.numOfPolls = user.polls.length;
      if (index === 0) {
        user.place = 1;
      }
      else {
        const prevUser = array[index - 1];
        user.place = calcTotalPoints(user) < calcTotalPoints(prevUser)
          ? prevUser.place + 1
          : prevUser.place;
      }
      return user;
    });
  return {
    users: sortedUsers
  };
};

export default connect(mapStateToProps)(Leaderboard);
