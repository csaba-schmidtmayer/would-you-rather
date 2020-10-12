import React from 'react';

import toggleLeft from '../svg/toggle-left.svg';
import toggleRight from '../svg/toggle-right.svg';

const icon = {
  unanswered: toggleLeft,
  answered: toggleRight
}

const DashboardFilter = (props) => (
  <div className="dashboard-filter">
    <div
      className="dashboard-toggle"
      onClick={props.toggleFilter}
    >
      <span className={`toggle-caption${props.direction === 'unanswered' ? ' active' : ''}`}>
        View unanswered polls
      </span>
      <img
        className="toggle-icon"
        src={icon[props.direction]}
      />
      <span className={`toggle-caption${props.direction === 'answered' ? ' active' : ''}`}>
        View answered polls
      </span>
    </div>
  </div>
);

export default DashboardFilter;
