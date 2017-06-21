import React from 'react'
import Logo from './logo';
import Greeting from './greeting';

class Header extends React.Component {

  render() {
    return (
      <header>
        <Logo/>
        <Greeting/>
      </header>
    );
  }

}

export default Header;
