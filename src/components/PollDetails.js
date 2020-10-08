import React from 'react';
import { connect } from 'react-redux';

import CreatedBy from '../components/CreatedBy';
import UnansweredOption from '../components/UnansweredOption';
import AnsweredOption from '../components/AnsweredOption';

class PollDetails extends React.Component {
  constructor(props) {
    super(props);

    this.handleOptionChoice = this.handleOptionChoice.bind(this);
  }

  handleOptionChoice(option) {
    console.log(option);
  }

  render() {
    const { author, poll, hasBeenAnswered } = this.props;
    return (
      <div>
        <CreatedBy author={author} />
        {hasBeenAnswered
          ? (
            <div>
              <AnsweredOption

              />
              <AnsweredOption

              />
            </div>
          )
          : (
            <div>
              <UnansweredOption
                text={poll.optionOne.text}
                option="OptionOne"
                onChoice={this.handleOptionChoice}
              />
              <UnansweredOption
                text={poll.optionTwo.text}
                option="OptionTwo"
                onChoice={this.handleOptionChoice}
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
    hasBeenAnswered: (activeUser.answers[id] === undefined)
      ? false
      : true
  };
};

export default connect(mapStateToProps)(PollDetails);
