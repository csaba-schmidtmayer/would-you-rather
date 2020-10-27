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
          icon: home,
          alt: 'Link to the dashboard'
        },
        {
          linkTo: '/leaderboard',
          icon: trophy,
          alt: 'Link to the leaderboard'
        },
        {
          linkTo: '/add',
          icon: pencil,
          alt: 'Link to the create new poll page'
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
            alt={link.alt}
          />
        ))}
      </nav>
    );
  }
}

export default Navbar;
