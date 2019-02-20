import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../App.css';
import Auth from '../Auth/Auth.js';

const auth = new Auth();

class SignIn extends Component {

  signIn(event) {
    event.preventDefault();
    auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="App">
        <div className="am-page-wrapper">
            <div className="am-page-form">
            {
              !isAuthenticated() ?
              auth.login()
              :
              <Redirect to='dashboard' />
            }
        </div>
      </div>
      </div>
    );
  }
}

export default SignIn;
