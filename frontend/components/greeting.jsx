import React from 'react';
import { logout } from '../actions/session_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Greeting extends React.Component {

  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
  }

  render() {
    const user = this.props.user;

    if (user) {
      return (
        <section>
          {`Welcome: ${user.name}`}
          <button onClick={this.handleLogout}>Logout</button>
        </section>
      );
    } else {
      return (
        <section>
          <ul>
            <li><Link to='/signup'>Sign Up</Link></li>
            <li><Link to='/login'>Log In</Link></li>
          </ul>
        </section>
      );
    }
  }
}


const mapStateToProps = (state) => ({
  user: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);
