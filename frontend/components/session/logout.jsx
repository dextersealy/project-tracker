import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../util/header';

class LoggedOut extends React.Component {
  componentDidMount() {
    document.body.classList.toggle('auth', true);
  }

  componentWillUnmount() {
    document.body.classList.toggle('auth', false);
  }

  render() {
    return (
      <div>
        <Header/>
        <section className='logout'>
          <h2>You have been logged out.</h2>
          <p>Thank you for using ProjectTracker.</p>
          <p>Your session has ended.</p>
          <p><Link to='/login'>Click here</Link> to sign in again.</p>
        </section>
      </div>
    )
  }
}

export default LoggedOut;
