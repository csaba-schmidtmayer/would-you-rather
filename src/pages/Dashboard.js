import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import DashboardMenu from '../components/DashboardMenu';
import PollOverview from '../components/PollOverview';
import { FILTER_UNANSWERED, FILTER_ANSWERED, FILTER_ALL, SORT_BY_NEWEST, SORT_BY_OLDEST, SORT_BY_MOST_POPULAR, SORT_BY_LEAST_POPULAR } from '../constants/const';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      filterValue: FILTER_UNANSWERED,
      sortValue: SORT_BY_NEWEST
    }

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchCancel = this.handleSearchCancel.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleFilterChange(value) {
    this.setState((prevState) => ({
      ...prevState,
      filterValue: value
    }));
  }

  handleSearchChange(event) {
    const value = event.target.value;
    event.preventDefault();
    this.setState((prevState) => ({
      ...prevState,
      searchValue: value
    }));
  }

  handleSearchCancel() {
    this.setState((prevState) => ({
      ...prevState,
      searchValue: ''
    }));
  }

  handleSortChange(value) {
    this.setState((prevState) => ({
      sortValue: value
    }));
  }

  mapOutPolls() {
    const { polls } = this.props;
    const { searchValue, filterValue, sortValue } = this.state;

    const searchedPolls = searchValue === ''
      ? polls
      : polls.filter((poll) => (
        poll.optionOne.toLowerCase().includes(searchValue.toLowerCase()) ||
        poll.optionTwo.toLowerCase().includes(searchValue.toLowerCase())
      ));

    const filteredPolls = filterValue === FILTER_ALL
      ? searchedPolls
      : filterValue === FILTER_UNANSWERED
        ? searchedPolls.filter((poll) => (poll.answer === null))
        : searchedPolls.filter((poll) => (poll.answer !== null));

    const sortedPolls = sortValue === SORT_BY_NEWEST
      ? filteredPolls.sort((a, b) => (b.created - a.created))
      : sortValue === SORT_BY_OLDEST
        ? filteredPolls.sort((a, b) => (a.created - b.created))
        : sortValue === SORT_BY_MOST_POPULAR
          ? filteredPolls.sort((a, b) => (b.numOfAnswers - a.numOfAnswers))
          : filteredPolls.sort((a, b) => (a.numOfAnswers - b.numOfAnswers));

    return filteredPolls.map((poll) => (
      <PollOverview
        key={poll.id}
        id={poll.id}
        optionOne={poll.optionOne}
        optionTwo={poll.optionTwo}
        answer={poll.answer}
      />
    ));
  }

  render() {
    return (
      <Fragment>
        <DashboardMenu
          activeSearch={this.state.searchValue}
          onSearchChange={this.handleSearchChange}
          onSearchCancel={this.handleSearchCancel}
          activeFilter={this.state.filterValue}
          onFilterChange={this.handleFilterChange}
          activeSort={this.state.sortValue}
          onSortChange={this.handleSortChange}
        />
        <div>
          {this.mapOutPolls()}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ polls, activeUser }) => {
  const allPolls = Object.keys(polls).map((key) =>({
    id: key,
    optionOne: polls[key].optionOne.text,
    optionTwo: polls[key].optionTwo.text,
    created: polls[key].created,
    numOfAnswers: polls[key].optionOne.numOfAnswers + polls[key].optionTwo.numOfAnswers,
    answer: activeUser.answers[key] !== undefined
      ? activeUser.answers[key]
      : null
  }));
  return {
    polls: allPolls
  };
};

export default connect(mapStateToProps)(Dashboard);
