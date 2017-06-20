import React from 'react'
import Greeting from './greeting';

class Header extends React.Component {

  render() {
    return (
      <header>
        <logo>
          <img src={window.images.logo} alt="Project Tracker logo"/>
        </logo>
        <Greeting />
      </header>
    );
  }

}

export default Header;
