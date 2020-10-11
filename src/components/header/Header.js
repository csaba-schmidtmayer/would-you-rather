import React from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import UserHeader from './UserHeader';

const Header = (props) => (
  <header id="main-header">
    <div className="header-left" />
    <Navbar />
    <UserHeader />
  </header>
);

export default Header;
