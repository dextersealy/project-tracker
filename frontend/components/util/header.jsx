import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../actions/session_actions';
import Logo from './logo';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout()
      .then(() => this.props.history.push('/logout'));
  }

  render() {
    const { user } = this.props;
    return (
      <header>
        <Logo/>
        { this.props.user &&
          <div className='greeting'>
            <p className='name'>{`${user.name}`}</p>
            <button onClick={this.handleLogout}>Sign Out</button>
          </div>
        }
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header));
