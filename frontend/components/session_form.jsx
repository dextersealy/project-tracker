import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {login, signup} from '../actions/session_actions';

class SessionForm extends React.Component{
  constructor(props) {
		super(props);
		this.state = { email: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(this.props.formType, user);
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
    const formType = this.props.formType;
    let header, label, link;

    if (formType === 'login') {
      header = (<header>Log In</header>);
      link = <Link to='/signup'>Sign Up</Link>;
      label = "Log In";
    } else if (formType === 'signup') {
      header = <header>Sign Up</header>;
      link = <Link to='/login'>Log In</Link>;
      label = "Sign Up";
    }

    const errors = this.props.errors.map((error, idx) => <li key={idx}>{error}</li>);
    const {email, password} = this.state;
    return (
      <section>
        {header}
        <form>
          <input onChange={this.handleChange("email")} value={email}/>
          <input onChange={this.handleChange("password")} value={password}/>
          <button onClick={this.handleSubmit}>{label}</button>
        </form>
        {link}
        <ul>{errors}</ul>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    formType: ownProps.location.pathname.slice(1),
    errors: state.session.errors,
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  processForm: (formType, user) => {
    if (formType === 'login'){
      dispatch(login(user));
    } else if (formType === 'signup') {
      dispatch(signup(user));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(SessionForm);
