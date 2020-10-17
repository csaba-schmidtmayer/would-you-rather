import React from 'react';
import { connect } from 'react-redux';
import { HorizontalBar } from 'react-chartjs-2';
import 'chartjs-plugin-stacked100';

import { answerPoll } from '../actions/pollActions';
import UserHeader from '../components/UserHeader';
import UnansweredOption from '../components/UnansweredOption';
import AnsweredOption from '../components/AnsweredOption';

class PollDetails extends React.Component {
  constructor(props) {
    super(props);

    this.handleOptionChoice = this.handleOptionChoice.bind(this);

    this.chartOptions = {
      maintainAspectRatio: false,
      tooltips: {
        mode: 'nearest',
        titleFontFamily: `'Titillium Web', sans-serif`,
        bodyFontFamily: `'Open Sans', sans-serif`
      },
      legend: {
        labels: {
          fontFamily: `'Titillium Web', sans-serif`
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            callback: (value, index, values) => ('')
            }
        }]
      },
      plugins: {
        stacked100: {
          enable: true,
          precision: 0
        }
      }
    };
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

  formatDate() {
    const addZero = (value) => (
      value < 10
        ? `0${value}`
        : value
    );

    const date = this.props.poll.created;

    const year = date.getFullYear();
    const month = addZero(date.getMonth());
    const day = addZero(date.getDate());
    const hour = addZero(date.getHours());
    const min = addZero(date.getMinutes());

    return `${year}-${month}-${day} ${hour}:${min}`
  };

  render() {
    const { author, poll, answer } = this.props;
    const { optionOnePercent, optionTwoPercent } = this.countPercentage();

    return (
      <div className="poll-detailed">
        <UserHeader
          username={author}
          additionalInfo={this.formatDate()}
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
                  option="OptionOne"
                  chosen={answer === 'OptionOne' ? true : false}
                  number={poll.optionOne.numOfAnswers}
                  percentage={optionOnePercent}
                />
              )
          }
          <div className="poll-divider-container">
            <span className="poll-divider">or</span>
          </div>
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
                  option="OptionTwo"
                  chosen={answer === 'OptionTwo' ? true : false}
                  number={poll.optionTwo.numOfAnswers}
                  percentage={optionTwoPercent}
                />
              )
          }
         </div>
         {
           answer === undefined
            ? null
            : (
              <div className="poll-chart">
                <HorizontalBar
                  height={140}
                  data={
                    {
                      labels: ['Would you rather...?'],
                      datasets:
                        [
                          {
                            label: `${poll.optionOne.text}${answer === 'OptionOne' ? ' (your choice)' : ''}`,
                            data: [poll.optionOne.numOfAnswers],
                            backgroundColor: answer === 'OptionOne' ? '#7395ae' : '#938e93'
                          },
                          {
                            label: `${poll.optionTwo.text}${answer === 'OptionTwo' ? ' (your choice)' : ''}`,
                            data: [poll.optionTwo.numOfAnswers],
                            backgroundColor: answer === 'OptionTwo' ? '#7395ae' : '#938e93'
                          }
                        ]
                    }
                  }
                  options={this.chartOptions}
                />
              </div>
            )
         }
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
