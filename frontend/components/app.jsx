import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Header from './header';
import SignUpForm from './sign_up_form';
import LoginForm from './login_form';

const App = () => (
  <div>
    <Header />
    <AuthRoute path="/login" component={LoginForm} />
    <AuthRoute path="/signup" component={SignUpForm} />
  </div>
);

export default App;
