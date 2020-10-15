import React from 'react';
import { connect } from 'react-redux';

import { answerPoll } from '../actions/pollActions';
import CreatedBy from '../components/CreatedBy';
import UnansweredOption from '../components/UnansweredOption';
import AnsweredOption from '../components/AnsweredOption';

class PollDetails extends React.Component {
  constructor(props) {
    super(props);

    this.handleOptionChoice = this.handleOptionChoice.bind(this);
  }

  handleOptionChoice(option) {
    this.props.dispatch(answerPoll(this.props.id, option));
  }

  countPercentage() {
    const { poll } = this.props;
    const sum = poll.optionOne.numOfAnswers + poll.optionTwo.numOfAnswers;
    const optionOnePercent = sum === 0
      ? 0
      : Math.round(poll.optionOne.numOfAnswers / sum * 100);
    const optionTwoPercent = sum === 0
      ? 0
      : 100 - optionOnePercent;
    return {optionOnePercent, optionTwoPercent};
  }

  render() {
    const { author, poll, answer } = this.props;
    const { optionOnePercent, optionTwoPercent } = this.countPercentage();

    return (
      <div className="poll-detailed">
        <CreatedBy
          author={author}
          created={poll.created}
         />
         <div className="poll-header">
           Would you rather...?
         </div>
         <div className="poll-options">
          {
            answer === undefined
              ? (
                <UnansweredOption
                  text={poll.optionOne.text}
                  option="OptionOne"
                  onChoice={this.handleOptionChoice}
                />
              )
              : (
                <AnsweredOption
                  text={poll.optionOne.text}
                  chosen={answer === 'OptionOne' ? true : false}
                  number={poll.optionOne.numOfAnswers}
                  percentage={optionOnePercent}
                />
              )
          }
          <span className="poll-divider">or</span>
          {
            answer === undefined
              ? (
                <UnansweredOption
                  text={poll.optionTwo.text}
                  option="OptionTwo"
                  onChoice={this.handleOptionChoice}
                />
              )
              : (
                <AnsweredOption
                  text={poll.optionTwo.text}
                  chosen={answer === 'OptionTwo' ? true : false}
                  number={poll.optionTwo.numOfAnswers}
                  percentage={optionTwoPercent}
                />
              )
          }
         </div>
      </div>
    );
  }

}

const mapStateToProps = ({ polls, users, activeUser }, props) => {
  const { id } = props;
  const poll = polls[id];
  const author = users[poll.author].username;

  return {
    id,
    poll,
    author,
    answer: activeUser.answers[id]
  };
};

export default connect(mapStateToProps)(PollDetails);
