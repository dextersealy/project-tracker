import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo';
import Greeting from './greeting';

const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero-header'>
        <Logo/>
        <div className='greeting'>
          <Link className='button' to='/login'>Sign In</Link>
        </div>
      </div>
      <div className='hero-text'>
        <div className='hero-headline'>
          <p>Keep your team on track</p>
          <div className='hero-tagline'>
            Project Tracker helps agile teams collaborate and stay in sync
            <div className='hero-action'>
              <Link className='button' to='/signup'>Sign up for free</Link>
              <p>Already have an account? <Link to='/login'>Sign In</Link></p>
            </div>
          </div>
        </div>
      </div>
      <div className='hero-footer'>
      </div>
    </div>
  )
}

export default Hero;
