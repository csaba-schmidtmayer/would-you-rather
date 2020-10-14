import React from 'react';
import { connect } from 'react-redux';

import avatars from '../svg/avatars';

const formatDate = (date) => {
  const addZero = (value) => (
    value < 10
      ? `0${value}`
      : value
  );

  const year = date.getFullYear();
  const month = addZero(date.getMonth());
  const day = addZero(date.getDate());
  const hour = addZero(date.getHours());
  const min = addZero(date.getMinutes());

  return `${year}-${month}-${day} ${hour}:${min}`
};

const CreatedBy = (props) => (
  <div className="poll-author">
    <img
      className="poll-author-avatar"
      src={avatars[props.author.avatar]}
    />
    <div className="poll-author-data">
      <span className="full-name">
        {props.author.name}
      </span>
      <span className="username">
        {props.author.username}
      </span>
      <span className="creation-date">
        {formatDate(props.created)}
      </span>
    </div>
  </div>
);

const mapStateToProps = ({ users }, props) => {
  const { author } = props;

  return {
    author: users[author]
  }
};

export default connect(mapStateToProps)(CreatedBy);
