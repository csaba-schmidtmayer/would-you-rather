import React from 'react';

import NavbarLink from './NavbarLink';
import home from '../../svg/home.svg';
import trophy from '../../svg/trophy.svg';
import pencil from '../../svg/pencil.svg';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      links: [
        {
          linkTo: '/',
          icon: home
        },
        {
          linkTo: '/leaderboard',
          icon: trophy
        },
        {
          linkTo: '/add',
          icon: pencil
        },
      ]
    }
  }

  render() {
    return (
      <nav className="navbar">
        {this.state.links.map((link) => (
          <NavbarLink
            key={link.linkTo}
            linkTo={link.linkTo}
            icon={link.icon}
          />
        ))}
      </nav>
    );
  }
}

export default Navbar;
