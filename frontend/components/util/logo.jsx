import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { selectProject } from '../../util/selectors';
import LogoMenu from './logo_menu';

const Logo = ({ loggedIn }) => {
  return (
    <logo>
      <Link to='/'>
        <img className='logo-image' src={window.images.logo} alt='logo'/>
      </Link>
      {loggedIn ? <LogoMenu/> : <Link to='/'><p>Project Tracker</p></Link> }
    </logo>
  );
}

const mapStateToProps = (state, ownProps) => ({
  loggedIn: Boolean(state.session.currentUser),
});

export default withRouter(connect(
  mapStateToProps
)(Logo));
