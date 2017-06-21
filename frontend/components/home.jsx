import React from 'react';
import { connect } from 'react-redux';

import Dashboard from './dashboard';
import Hero from './hero';

const Home = ({loggedIn}) => {
  if (loggedIn) {
    return <Dashboard />
  } else {
    return <Hero />
  }
}

const mapStateToProps = (state) => ({
  loggedIn: Boolean(state.session.currentUser)
});

export default connect(
  mapStateToProps
)(Home);
