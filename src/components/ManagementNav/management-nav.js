import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as config from '../../auth_config';
import auth0 from 'auth0-js';

class ManagementNav extends Component {

  logout(event) {
    event.preventDefault();
    var webAuth = new auth0.WebAuth({
      domain:       config.DOMAIN,
      clientID:     config.CLIENTID
    });
    
    webAuth.logout({
      returnTo: config.BASEURL,
      client_id: config.CLIENTID
    });
  }

  render() {
    return (
      <div class="header-container">
        <div class="header-content-wrapper">
          <p>Welcome {this.props.profile['http://localhost/user_metadata'].name}!</p>
          <span onClick={this.logout}>Logout</span>
          <div className="manage-links-wrapper">
            <p><Link to='sign-up'>Manage Users</Link></p>
            {/* <p>Manage Reports</p> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ManagementNav;
