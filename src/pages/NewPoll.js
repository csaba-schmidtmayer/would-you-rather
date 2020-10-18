import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import PollHeader from '../components/PollHeader';
import InputField from '../components/InputField';
import { newPoll } from '../actions/pollActions';
import { SUCCESS } from '../constants/const';

class NewPoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      optionOne: {
        value: '',
        warning: undefined
      },
      optionTwo: {
        value: '',
        warning: undefined
      }
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleNewPollSubmit = this.handleNewPollSubmit.bind(this);
  }

  handleFormChange(event) {
    const target = event.target;
    event.preventDefault();
    this.setState((prevState) => ({
      ...prevState,
      [target.name]: {
        ...prevState[target.name],
        value: target.value
      }
    }));
  }

  handleNewPollSubmit(event) {
    event.preventDefault();
    this.props.dispatch(newPoll(this.state.optionOne.value, this.state.optionTwo.value));
  }

  render() {
    const { dbMsg } = this.props;
    return (
      (dbMsg.msgText === SUCCESS)
        ? <Redirect push to={`/polls/${dbMsg.msgParams.pollId}`} />
        : <div className="new-poll">
          {dbMsg.msgText ? <p>{dbMsg.msgText}</p> : null}
          <PollHeader />
          <form onSubmit={this.handleNewPollSubmit}>
            <div className="poll-option input-option">
              <InputField
                name="optionOne"
                type="text"
                placeholder="Enter first option"
                value={this.state.optionOne.value}
                warning={this.state.optionOne.warning}
                onChange={this.handleFormChange}
              />
            </div>
            <div className="poll-divider-container">
              <span className="poll-divider">or</span>
            </div>
            <div className="poll-option input-option">
              <InputField
                name="optionTwo"
                type="text"
                placeholder="Enter second option"
                value={this.state.optionTwo.value}
                warning={this.state.optionTwo.warning}
                onChange={this.handleFormChange}
              />
            </div>
            <div className="input-submit">
              <button
                type="submit"
                disabled={this.state.optionOne.value === '' || this.state.optionTwo.value === ''}>
                Submit new poll
              </button>
            </div>
          </form>
        </div>
    );
  }
}

const mapStateToProps = ({ dbMsg }) => ({
  dbMsg
});

export default connect(mapStateToProps)(NewPoll);
