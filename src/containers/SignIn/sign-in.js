import React, { Component } from 'react';
import '../../App.css';
import auth0 from 'auth0-js';
import { Link } from 'react-router-dom';
import * as config from '../../auth_config';

import Auth from '../Auth/Auth.js';

const auth = new Auth();

  // Initialize application
  const webAuth = new auth0.WebAuth({
    domain:       config.DOMAIN,
    clientID:     config.CLIENTID
  });

class SignIn extends Component {

  signIn(event) {
    event.preventDefault();
    auth.login();
  }

  signOut() {
    webAuth.logout({
      returnTo: config.BASEURL,
      client_id: config.CLIENTID
    });
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="App">
        <div className="am-page-wrapper">
            <div className="am-page-form">
            <span className="am-page-form-title">SOLE Account Management Dashboard</span>
            {
              !isAuthenticated() && (
                <div>
                <button onClick={this.signIn.bind(this)} className="am-page-form-submit-button">Sign In</button>
                <button onClick={this.signOut.bind(this)}>Logout</button>
                </div>
                )
            }
        {
          isAuthenticated() && (
              <h4>
                You are logged in! You can now view your{' '}
                <Link to="dashboard">dashboard</Link>
                .
                <button onClick={this.signOut.bind(this)}>Logout</button>
              </h4>
            )
        }
            </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
