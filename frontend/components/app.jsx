import React from 'react';
import { Route } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Home from './home';
import Dashboard from './dashboard/dashboard';
import Project from './project/project';
import Login from './session/login';
import SignUp from './session/signup';
import LogOut from './session/logout';
import Analytics from './util/analytics';

const App = () => (
  <div>
    <Analytics/>
    <Route exact path='/' component={Home} />
    <AuthRoute path='/login' component={Login} />
    <AuthRoute path='/signup' component={SignUp} />
    <AuthRoute path='/logout' component={LogOut} />
    <ProtectedRoute path='/projects' component={Dashboard} />
    <ProtectedRoute path='/project/:id' component={Project} />
  </div>
);

export default DragDropContext(
  HTML5Backend
)(App);
