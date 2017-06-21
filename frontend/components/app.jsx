import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import Home from './home';
import Login from './login_form';
import SignUp from './sign_up_form';
import LoggedOut from './logout';

const App = () => (
  <div>
    <Route exact path='/' component={Home} />
    <AuthRoute path='/login' component={Login} />
    <AuthRoute path='/signup' component={SignUp} />
    <AuthRoute path='/logout' component={LoggedOut} />
  </div>
);

export default App;
