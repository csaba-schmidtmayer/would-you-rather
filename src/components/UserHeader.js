import React from 'react';
import { connect } from 'react-redux';

import avatars from '../svg/avatars';

const UserHeader = (props) => (
  <div className="user-header">
    <img
      className="user-header-avatar"
      src={avatars[props.user.avatar]}
    />
    <div className="user-header-data">
      <span className="full-name">
        {props.user.name}
      </span>
      <span className="username">
        {props.user.username}
      </span>
      {
        props.additionalInfo === undefined
          ? null
          : (
            <span className="additional-info">
              {props.additionalInfo}
            </span>
          )
      }
    </div>
    {
      props.award === undefined
        ? null
        : <div className={props.award} />
    }
  </div>
);

const mapStateToProps = ({ users }, props) => {
  const { username } = props;

  return {
    user: users[username]
  }
};

export default connect(mapStateToProps)(UserHeader);