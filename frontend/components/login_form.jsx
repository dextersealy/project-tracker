import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, clearErrors } from '../actions/session_actions';
import Header from './header';
import ErrorMsg from './error';

class LoginForm extends React.Component{
  constructor(props) {
		super(props);
		this.state = { email: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    this.props.login(user);
  }

  handleChange(field) {
    return (e) => {
      e.preventDefault();
      const newState = Object.assign({}, this.state);
      newState[field] = e.currentTarget.value;
      this.setState(newState);
    };
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
            <input id='email' onChange={this.handleChange('email')} value={email}/>
            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' onChange={this.handleChange('password')} value={password}/>
            <ErrorMsg msg={this.props.errors[0]}/>
            <button onClick={this.handleSubmit}>Sign In</button>
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
    errors: state.session.errors,
  });
};

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
