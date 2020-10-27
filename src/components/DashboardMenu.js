import React from 'react';

import InputDropdown from '../components/InputDropdown';
import { FILTER_UNANSWERED, FILTER_ANSWERED, FILTER_ALL, SORT_BY_NEWEST, SORT_BY_OLDEST, SORT_BY_MOST_POPULAR, SORT_BY_LEAST_POPULAR } from '../constants/const';
import toggleLeft from '../svg/toggle-left.svg';
import toggleRight from '../svg/toggle-right.svg';
import search from '../svg/search.svg';
import cancel from '../svg/cancel.svg';

class DashboardMenu extends React.Component {
  constructor(props) {
    super(props);

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
          alt="Toggles the active filter"
        />
        <span>{option.label}</span>
      </div>
    ));
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
              alt="Search field"
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
              alt="Deletes the search input"
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
          <InputDropdown
            options={this.sortOptions}
            onChange={this.props.onSortChange}
          />
        </div>
      </div>
    );
  }
}

export default DashboardMenu;
