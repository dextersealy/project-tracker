import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <logo>
      <Link to='/'><img className="logo-image" src={window.images.logo} alt="Project Tracker logo"/></Link>
      <Link to='/'><p>Project Tracker</p></Link>
    </logo>
  );
}

export default Logo;
