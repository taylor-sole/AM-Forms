import React, { Component } from 'react';
import '../../App.css';
import auth0 from 'auth0-js';
import { getAllLeads } from '../../services/leads-service';
import * as config from '../../auth_config';
import ReactLoading from 'react-loading';

class AmManagement extends Component {

  constructor(props) {
    super(props);

    this.state = {
      leads: null
    }
  }

  componentDidMount() {
    getAllLeads().then((res) => {
      this.setState({
        leads: res
      })
    });
  }

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
    let allLeads;
    if (this.state.leads) {
      allLeads = this.state.leads.map((item, i) => (
        <ul key={i}>
          <li>Company Name: {item.company_name}</li>
        </ul>
      ))
    }

    return (
      <div className="App">
        <div className="am-page-wrapper">
          <button onClick={this.logout}>Logout</button>
          <span className="am-page-form-title">2nd Job Leads Overview</span>
          {allLeads}
         </div>
      </div>
    );
  }
}

export default AmManagement;
