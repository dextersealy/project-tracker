import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as FormUtil from '../../util/form_util';
import { clearErrors, reportError } from '../../actions/error_actions';
import { signup } from '../../actions/session_actions';
import Header from '../util/header';
import ErrorMsg from '../util/error';
import { Input, PasswordInput, SubmitButton } from './session_util';

class SignUpForm extends React.Component{
  constructor(props) {
		super(props);

		this.state = { name: '', email: '', password: '', confirm_password: ''};
    this.handleChange = FormUtil.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
          <h2>Sign Up</h2>
          {this.renderForm()}
          <div className='redirect'>
            <span>Already have an account?</span><Link to='/login'>Sign In</Link>
          </div>
        </section>
      </div>
    );
  }

  renderForm() {
    const { errors } = this.props;
    const { name, email, password, confirm_password } = this.state;
    const disabled = !Boolean(name && email && password && confirm_password);
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          label={'Name:'}
          value={name}
          handleChange={this.handleChange('name')}
          autoFocus={true}/>
        <ErrorMsg msg={errors.name}/>
        <Input
          label={'Email:'}
          value={email}
          handleChange={this.handleChange('email')}/>
        <ErrorMsg msg={errors.email}/>
        <PasswordInput
          value={password}
          handleChange={this.handleChange('password')}/>
        <ErrorMsg msg={errors.password}/>
        <PasswordInput
          label={'Confirm password:'}
          value={confirm_password}
          handleChange={this.handleChange('confirm_password')}/>
        <SubmitButton
          title={'Sign Up'}
          disabled={disabled}/>
      </form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    if (user.password !== user.confirm_password) {
      this.props.reportError('Passwords do not match');
    } else {
      user.initials = this.getInitials(user.name);
      this.props.signup(user);
    }
  }

  getInitials(name) {
    const initials = name.split(/\s+/).map(word => word[0]);
    return initials.join('').slice(0, 4);
  }
}

const mapStateToProps = state => {
  return ({
    errors: extractErrors(state),
  });
};

const mapDispatchToProps = dispatch => ({
  signup: user => dispatch(signup(user)),
  clearErrors: () => dispatch(clearErrors()),
  reportError: (errors) => dispatch(reportError(errors))
});

const extractErrors = ({ errors }) => {
  const result = {};
  errors.forEach(msg => {
    if (msg.match(/name/i)) {
      result.name = msg;
    } else if (msg.match(/email/i)) {
      result.email = msg;
    } else if (msg.match(/password/i)) {
      result.password = msg;
    }
  });
  return result;
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm));
