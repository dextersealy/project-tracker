import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { login, logout } from '../../actions/session_actions';

class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.handleGuestLogin = this.handleGuestLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleGuestLogin(event) {
    const email =  `guest${(event.ctrlKey) ? 2 : 1}@dsealy.com`
    const user = { email, password: 'password' };
    this.props.login(user);
  }

  handleLogout() {
    this.props.logout().then(() => this.props.history.push('/logout'));
  }

  render() {
    const { user } = this.props;
    return (
      <div className='greeting'>
        { user &&  <p className='name'>{`${user.name}`}</p> }
        { user &&
          <button type='submit' onClick={this.handleLogout}>Sign Out</button> }
        { this.props.homepage &&
          <Link className='button' to='/login'>Sign In</Link> }
        { !user &&
          <button type='button' className='guest'
            onClick={this.handleGuestLogin}>
            Guest Sign In
          </button> }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    homepage: ownProps.match.path === '/',
    user: state.session.currentUser,
})
};

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
  logout: () => dispatch(logout()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Greeting));
