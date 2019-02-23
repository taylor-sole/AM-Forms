import React, { Component } from 'react';
import '../../styles/App.css';
import auth0 from 'auth0-js';
import * as config from '../../auth_config';

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      userEmail: null,
      userPassword: null
    }
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);

    this.signUp = this.signUp.bind(this);
  }

  handleName(event) {
    this.setState({
      fullName: event.target.value
    })
  }

  handleEmail(event) {
    this.setState({
      userEmail: event.target.value
    })
  }

  handlePassword(event) {
    this.setState({
      userPassword: event.target.value
    })
  }

  handleTitle(event) {
    this.setState({
      jobTitle: event.target.value
    })
  }

  signUp(event) {
    event.preventDefault();
    var webAuth = new auth0.WebAuth({
      domain:       config.DOMAIN,
      clientID:     config.CLIENTID
    });
    
    webAuth.signup({
      connection: 'Username-Password-Authentication', 
      email: this.state.userEmail, 
      password: this.state.userPassword,
      user_metadata: { name: this.state.fullName }
    }, function (err, user_metadata) {
      if (err) return alert('Something went wrong: ' + err.message);
      return alert('user successfully created!') 
    });
  }

  render() {
    return (
      <div className="App">
        <div className="am-page-wrapper">
        <div className="am-page-form">
          <span className="am-page-form-title">Sign Up</span>
          <form>
            <div className="am-page-form-column-wrapper">
              <div className="am-page-form-column column-1">
                <div className="text-input-wrapper">
                  <p>Full Name</p>
                  <input onChange={this.handleName}  type="text" id="signup-name" required/>
                </div>
                <div className="text-input-wrapper">
                  <p>Email</p>
                  <input onChange={this.handleEmail} type="email" id="signup-email" required/>
                </div>
                <div className="text-input-wrapper">
                  <p>Password</p>
                  <input onChange={this.handlePassword} type="password" id="signup-password" required/>
                </div>
              </div>
            </div>
            <button onClick={this.signUp} className="am-page-form-submit-button">Sign Up</button>
          </form>
        </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
