import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Header from './header';
import Home from './home';
import SignUpForm from './sign_up_form';
import LoginForm from './login_form';

const App = () => (
  <div className="group">
    <Route exact path='/' component={Home} />
    <AuthRoute path="/login" component={LoginForm} />
    <AuthRoute path="/signup" component={SignUpForm} />
  </div>
);

export default App;
