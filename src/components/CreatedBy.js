import React from 'react';
import { connect } from 'react-redux';

const CreatedBy = (props) => (
  <div>
    <p>Created by</p>
    <p>{`Placeholder for avatar ${props.author.avatar}`}</p>
    <p>{props.author.name}</p>
    <p>{`@${props.author.username}`}</p>
  </div>
);

const mapStateToProps = ({ users }, props) => {
  const { author } = props;

  return {
    author: users[author]
  }
};

export default connect(mapStateToProps)(CreatedBy);
