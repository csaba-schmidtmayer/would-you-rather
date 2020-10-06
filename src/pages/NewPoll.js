import React from 'react';
import { connect } from 'react-redux';

import { newPoll } from '../actions/pollActions';

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
    return (
      <div>
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

export default connect(mapStateToProps)(NewPoll);
