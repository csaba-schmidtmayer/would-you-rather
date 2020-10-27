import React from 'react';

import Navbar from './Navbar';
import UserMenu from './UserMenu';

const Header = (props) => (
  <header id="main-header">
    <div className="header-left" />
    <Navbar />
    <UserMenu />
  </header>
);

export default Header;
