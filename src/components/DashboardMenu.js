import React, { Fragment } from 'react';

import { FILTER_UNANSWERED, FILTER_ANSWERED, FILTER_ALL, SORT_BY_NEWEST, SORT_BY_OLDEST, SORT_BY_MOST_POPULAR, SORT_BY_LEAST_POPULAR } from '../constants/const';
import toggleLeft from '../svg/toggle-left.svg';
import toggleRight from '../svg/toggle-right.svg';
import search from '../svg/search.svg';
import cancel from '../svg/cancel.svg';
import caretDown from '../svg/caret-down-full.svg';

class DashboardMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortOptionsVisible: false
    };

    this.handleSortClick = this.handleSortClick.bind(this);

    this.filterOptions = [
      {
        value: FILTER_UNANSWERED,
        label: 'Show unanswered polls only'
      },
      {
        value: FILTER_ANSWERED,
        label: 'Show answered polls only'
      },
      {
        value: FILTER_ALL,
        label: 'Show all polls'
      }
    ];

    this.sortOptions = [
      {
        value: SORT_BY_NEWEST,
        label: 'Newest first'
      },
      {
        value: SORT_BY_OLDEST,
        label: 'Oldest first'
      },
      {
        value: SORT_BY_MOST_POPULAR,
        label: 'Most popular first'
      },
      {
        value: SORT_BY_LEAST_POPULAR,
        label: 'Least popular first'
      }
    ]
  }

  mapFilterOptions() {
    return this.filterOptions.map((option) => (
      <div
        key={option.value}
        className="dashboard-toggle-option"
        onClick={() => this.props.onFilterChange(option.value)}
      >
        <img
          className="toggle-icon"
          src={this.props.activeFilter === option.value ? toggleRight : toggleLeft}
        />
        <span>{option.label}</span>
      </div>
    ));
  }

  mapSortOptions() {
    return this.sortOptions.map((option) => (
      <span
        key={option.value}
        className="dashboard-sort-option"
        onClick={() => this.props.onSortChange(option.value)}
      >
        {option.label}
      </span>
    ));
  }

  handleSortClick() {
    this.setState((prevState) => ({
      ...prevState,
      sortOptionsVisible: !prevState.sortOptionsVisible
    }));
  }

  findActiveSortLabel() {
    const activeSort = this.sortOptions.find((option) => (
      option.value === this.props.activeSort
    ));
    return activeSort.label;
  }

  render() {
    return (
      <div className="dashboard-menu">
        <div className="divider">
          Search
        </div>
        <div className="dashboard-menu-item">
          <div
            className="dashboard-search"
            onClick={() => {this.searchField.focus();}}>
            <img
              className="search-icon"
              src={search}
            />
            <input
              ref={(input) => {this.searchField = input;}}
              type="text"
              value={this.props.activeSearch}
              onChange={this.props.onSearchChange}
            />
            <img
              className={`cancel-icon${this.props.activeSearch !== '' ? '' : ' hidden'}`}
              src={cancel}
              onClick={this.props.onSearchCancel}
            />
          </div>
        </div>
        <div className="divider">
          Filter
        </div>
        <div className="dashboard-menu-item">
          {this.mapFilterOptions()}
        </div>
        <div className="divider">
          Sort
        </div>
        <div className="dashboard-menu-item">
          <div
            className="dashboard-sort"
            onClick={this.handleSortClick}
          >
            <span>{this.findActiveSortLabel()}</span>
            <img
              className="sort-icon"
              src={caretDown}
            />
            <div className={`dashboard-sort-menu${this.state.sortOptionsVisible ? '' : ' hidden'}`}>
              {this.mapSortOptions()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardMenu;
