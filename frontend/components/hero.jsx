import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from './logo';
import { login } from '../actions/session_actions';

class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.handleGuestLogin = this.handleGuestLogin.bind(this);
  }

  handleGuestLogin() {
    const user = { email: 'dsealy@alum.mit.edu', password: 'password' };
    this.props.login(user);
  }

  render() {
    return (
      <div className='hero'>
        <div className='hero-header'>
          <Logo/>
          <div className='greeting'>
            <Link className='button' to='/login'>Sign In</Link>
            <button onClick={this.handleGuestLogin}>Guest Sign In</button>
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
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
});

export default connect(
  null,
  mapDispatchToProps
)(Hero);
