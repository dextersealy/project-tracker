import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Auth = ({component: Component, path, loggedIn}) => (
  <Route path={path} render={(props) => {
      if (loggedIn) {
        return <Redirect to='/'/>
      } else {
        return <Component {...props}/>
      }
    }}
    />
);

const Protected = ({component: Component, path, loggedIn}) => (
  <Route path={path} render={(props) => {
      if (loggedIn) {
        return <Component {...props}/>
      } else {
        return <Redirect to='/login'/>
      }
    }}
    />
);

const mapStateToProps = (state) => ({
  loggedIn: Boolean(state.session.currentUser)
});

export const AuthRoute = withRouter(connect(
  mapStateToProps
)(Auth));

export const ProtectedRoute = withRouter(connect(
  mapStateToProps
)(Protected));
