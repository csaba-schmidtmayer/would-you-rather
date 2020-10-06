import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { newPoll } from '../actions/pollActions';
import { SUCCESS } from '../constants/const';

class NewPoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      optionOne: '',
      optionTwo: ''
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleNewPollSubmit = this.handleNewPollSubmit.bind(this);
  }

  handleFormChange(event) {
    const target = event.target;
    event.preventDefault();
    this.setState((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  }

  handleNewPollSubmit(event) {
    event.preventDefault();
    this.props.dispatch(newPoll(this.state.optionOne, this.state.optionTwo));
  }

  render() {
    // TODO: Add redirect to the new poll
    const { dbMsg } = this.props;
    return (
      (dbMsg.msgText === SUCCESS)
        ? <Redirect push to={`/polls/${dbMsg.msgParams.pollId}`} />
        : <div>
          {dbMsg.msgText ? <p>{dbMsg.msgText}</p> : null}
          <p>Would you rather...?</p>
          <form onSubmit={this.handleNewPollSubmit}>
            <input
              name="optionOne"
              type="text"
              placeholder="do this"
              value={this.state.optionOne}
              onChange={this.handleFormChange}
            />
            <input
              name="optionTwo"
              type="text"
              placeholder="do that"
              value={this.state.optionTwo}
              onChange={this.handleFormChange}
            />
            <button type="submit">
              Create new poll
            </button>
          </form>
        </div>
    );
  }
}

const mapStateToProps = ({ dbMsg }) => ({
  dbMsg
});

export default connect(mapStateToProps)(NewPoll);
