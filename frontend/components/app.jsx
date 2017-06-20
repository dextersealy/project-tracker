import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Greeting from './greeting';
import SessionForm from './session_form';

const App = () => (
  <div>
    <header>
      <h1>Project Tracker</h1>
      <Greeting />
    </header>
    <AuthRoute path="/login" component={SessionForm} />
    <AuthRoute path="/signup" component={SessionForm} />
  </div>
);

export default App;
