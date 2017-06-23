import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { clearErrors, reportErrors } from '../../actions/error_actions';
import { signup } from '../../actions/session_actions';
import Header from '../util/header';
import ErrorMsg from '../util/error';

class SignUpForm extends React.Component{
  constructor(props) {
		super(props);
		this.state = { name: '', email: '', password: '', confirm_password: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.body.classList.toggle('auth', true);
  }

  componentWillUnmount() {
    this.props.clearErrors();
    document.body.classList.toggle('auth', false);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    if (user.password !== user.confirm_password) {
      this.props.reportErrors(["Passwords do match"]);
    } else {
      user.initials = this.getInitials(user.name);
      this.props.signup(user).then(() => this.props.history.push('/projects'));
    }
  }

  getInitials(name) {
    const initials = name.split(/\s+/).map(word => word[0]);
    return initials.join('').slice(0, 4);
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
    const errors = {};
    this.props.errors.forEach(msg => {
      if (msg.match(/name/i)) {
        errors.name = msg;
      } else if (msg.match(/email/i)) {
        errors.email = msg;
      } else if (msg.match(/password/i)) {
        errors.password = msg;
      }
    });

    const disabled = !Boolean(this.state.name && this.state.email &&
      this.state.password && this.state.confirm_password);

    const {name, email, password, confirm_password} = this.state;
    return (
      <div>
        <Header />
        <section className='auth-form'>
          <h2>Sign Up</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='name'>Name:</label>
            <input
              id='name'
              onChange={this.handleChange('name')}
              value={name}
              autoFocus={true}
              />
            <ErrorMsg msg={errors.name}/>
            <label htmlFor='email'>Email:</label>
            <input id='email' onChange={this.handleChange('email')} value={email}/>
            <ErrorMsg msg={errors.email}/>
            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' onChange={this.handleChange('password')} value={password}/>
            <ErrorMsg msg={errors.password}/>
            <label htmlFor='confirm_password'>Confirm password:</label>
            <input type='password' id='confirm_password' onChange={this.handleChange('confirm_password')} value={confirm_password}/>
            <button type='submit' disabled={disabled}>Sign Up</button>
          </form>
          <div className='redirect'>
            <span>Already have an account?</span><Link to='/login'>Sign In</Link>
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
  signup: user => dispatch(signup(user)),
  clearErrors: () => dispatch(clearErrors()),
  reportErrors: (errors) => dispatch(reportErrors(errors))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm));
