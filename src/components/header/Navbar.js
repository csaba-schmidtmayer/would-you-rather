import React from 'react';
import { Link } from 'react-router-dom';

import home from '../../svg/home.svg';
import trophy from '../../svg/trophy.svg';
import pencil from '../../svg/pencil.svg';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar">
        <Link to="/">
          <div className="navbar-link">
            <img
              className="main-header-icon"
              src={home}
            />
            <div className="navbar-link-active" />
          </div>
        </Link>
        <Link to="/leaderboard">
          <div className="navbar-link">
            <img
              className="main-header-icon"
              src={trophy}
            />
            <div className="navbar-link-active" />
          </div>
        </Link>
        <Link to="/add">
          <div className="navbar-link">
            <img
              className="main-header-icon"
              src={pencil}
            />
            <div className="navbar-link-active" />
          </div>
        </Link>
      </nav>
    );
  }
}

export default Navbar;
