import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import DashboardFilter from '../components/DashboardFilter';
import PollOverview from '../components/PollOverview';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleSet: 'unanswered'
    }

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState((prevState) => ({
      ...prevState,
      visibleSet: prevState.visibleSet === 'unanswered'
        ? 'answered'
        : 'unanswered'
    }));
  }

  render() {
    return (
      <Fragment>
        <DashboardFilter
          toggleFilter={this.handleToggle}
          direction={this.state.visibleSet}
        />
        {this.state.visibleSet === 'unanswered'
          ? (
            <div>
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
          )
          : (
            <div>
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
          )
        }
      </Fragment>
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
