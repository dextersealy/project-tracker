import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Hero from './hero';

const Home = ({loggedIn}) => {
  if (loggedIn) {
    return <Redirect to='/projects'/>
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
