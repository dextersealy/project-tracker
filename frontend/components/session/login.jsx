import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as FormUtil from '../../util/form_util';
import { clearErrors } from '../../actions/error_actions';
import { login } from '../../actions/session_actions';
import Header from '../util/header';
import ErrorMsg from '../util/error';

class LoginForm extends React.Component {
  constructor(props) {
		super(props);
		this.state = { email: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = FormUtil.handleChange().bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
    document.body.classList.toggle('auth', true);
  }

  componentWillUnmount() {
    document.body.classList.toggle('auth', false);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.login(user).then(() => this.props.history.push('/projects'));
  }

  render() {
    const {email, password} = this.state;
    return (
      <div>
        <Header />
        <section className='auth-form'>
          <h2>Sign In</h2>
          <form>
            <label htmlFor='email'>Email:</label>
            <input
              id='email'
              onChange={this.handleChange('email')}
              value={email}
              autoFocus={true}
              />
            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' onChange={this.handleChange('password')} value={password}/>
            <ErrorMsg msg={this.props.errors[0]}/>
            <button
              type='submit'
              disabled={!(this.state.email && this.state.password)}
              onClick={this.handleSubmit}
              >Sign In</button>
          </form>
          <div className='redirect'>
            <span>New user?</span><Link to='/signup'>Sign Up</Link>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    errors: state.errors,
  });
};

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
  clearErrors: () => dispatch(clearErrors())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm));
