import React from 'react'
import Logo from './logo';
import Greeting from './greeting';
import Contact from './contact';

const Header = () => {
  return (
    <header>
      <Logo/>
      <Contact/>
      <Greeting/>
    </header>
  );
}

export default Header;
