import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Home from './home';
import Dashboard from './dashboard';
import Login from './session/login_form';
import SignUp from './session/sign_up_form';
import LoggedOut from './session/logout';

const App = () => (
  <div>
    <Route exact path='/' component={Home} />
    <AuthRoute path='/login' component={Login} />
    <AuthRoute path='/signup' component={SignUp} />
    <AuthRoute path='/logout' component={LoggedOut} />
    <ProtectedRoute path='/projects' component={Dashboard} />
  </div>
);

export default App;
