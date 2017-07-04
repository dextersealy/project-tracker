import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as FormUtil from '../../util/form_util';
import { clearErrors } from '../../actions/error_actions';
import { login } from '../../actions/session_actions';
import Header from '../util/header';
import ErrorMsg from '../util/error';
import { Input, PasswordInput, SubmitButton } from './session_util';

class LoginForm extends React.Component {
  constructor(props) {
		super(props);

		this.state = { email: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = FormUtil.handleChange.bind(this);
  }

  componentDidMount() {
    document.body.classList.toggle('auth', true);
  }

  componentWillUnmount() {
    this.props.clearErrors();
    document.body.classList.toggle('auth', false);
  }

  render() {
    return (
      <div>
        <Header/>
        <section className='auth-form'>
          <h2>Sign In</h2>
          {this.renderForm()}
          <div className='redirect'>
            <span>New user?</span><Link to='/signup'>Sign Up</Link>
          </div>
        </section>
      </div>
    );
  }

  renderForm() {
    const { email, password } = this.state;
    const disabled = !Boolean(email && password);
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          label={'Email:'}
          value={email}
          handleChange={this.handleChange('email')}
          autoFocus={true}/>
        <PasswordInput
          value={password}
          handleChange={this.handleChange('password')}/>
        <ErrorMsg msg={this.props.error}/>
        <SubmitButton
          title={'Sign In'}
          disabled={disabled}/>
      </form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state);
  }
}

const mapStateToProps = state => {
  return ({
    error: state.errors[0],
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
