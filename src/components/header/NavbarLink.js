import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLink = (props) => (
  <Link to={props.linkTo}>
    <div className="navbar-link">
      <img
        className="main-header-icon"
        src={props.icon}
        alt={props.alt}
      />
      <div className="navbar-link-active" />
    </div>
  </Link>
);

export default NavbarLink;
