import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import history from './history';

import './styles/index.css';

// COMPONENTS //
import AuthCallback from './components/AuthCallback/auth-callback';

// CONTAINERS //

import Dashboard from './containers/Dashboard/dashboard';
import SignUp from './containers/SignUp/sign-up';
import SignIn from './containers/SignIn/sign-in';
import Profile from './containers/Profile/Profile';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route exact path="/dashboard" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/"/>
            ) : (
              <Dashboard auth={auth} {...props} />
            )
          )} />
        <Route exact path="/callback" render={(props) => {
          handleAuthentication(props);
          return <AuthCallback {...props} /> 
        }}/>
        <Route exact path="/" render={(props) => <SignIn auth={auth} {...props} />} />
      </div>
    </Router>
  );
}