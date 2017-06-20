import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signup } from '../actions/session_actions';

class SignUpForm extends React.Component{
  constructor(props) {
		super(props);
		this.state = { name: '', email: '', password: '', confirm_password: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    user.initials = this.getInitials(user.name);
    this.props.signup(user);
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
    const errors = this.props.errors.map((error, idx) => <li key={idx}>{error}</li>);
    const {name, email, password, confirm_password} = this.state;
    return (
      <section className='session-form'>
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='name'>Name:</label>
          <input id='name' onChange={this.handleChange('name')} value={name}/>
          <label htmlFor='email'>Email:</label>
          <input id='email' onChange={this.handleChange('email')} value={email}/>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' onChange={this.handleChange('password')} value={password}/>
          <label htmlFor='confirm_password'>Confirm password:</label>
          <input type='password' id='confirm_password' onChange={this.handleChange('confirm_password')} value={confirm_password}/>
          <button>Sign Up</button>
          <ul>{errors}</ul>
        </form>
        <div className='redirect'>
          <span>Already have an account?</span><Link to='/login'>Sign In</Link>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return ({
    errors: state.session.errors,
  });
};

const mapDispatchToProps = dispatch => ({
  signup: user => dispatch(signup(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(SignUpForm);
