import React, { Component } from 'react';
import '../../App.css';
import auth0 from 'auth0-js';
import { addLead } from '../../services/leads-service';
import * as config from '../../auth_config';

class AmForms extends Component {

  constructor(props) {
    super(props);

    this.state = {
      company_name: null,
      phone_number: null,
      cardholder_name: null,
      contact_name: null,
      contact_email: null,
      account_number: null
    }
    this.handleCompanyName = this.handleCompanyName.bind(this);
    this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
    this.handleCardholderName = this.handleCardholderName.bind(this);
    this.handleContactName = this.handleContactName.bind(this);
    this.handleContactEmail = this.handleContactEmail.bind(this);
    this.handleAccountNumber = this.handleAccountNumber.bind(this);
    this.addLead = this.addLead.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleCompanyName(event) {
    this.setState({
      company_name: event.target.value
    })
  }

  handlePhoneNumber(event) {
    this.setState({
      phone_number: event.target.value
    })
  }

  handleCardholderName(event) {
    this.setState({
      cardholder_name: event.target.value
    })
  }

  handleContactName(event) {
    this.setState({
      contact_name: event.target.value
    })
  }

  handleContactEmail(event) {
    this.setState({
      contact_email: event.target.value
    })
  }

  handleAccountNumber(event) {
    this.setState({
      account_number: event.target.value
    })
  }

  addLead(event) {
    event.preventDefault();
    if (this.props.profile) {
      const am_name = this.props.profile['http://localhost/user_metadata'].name;
      const am_email = this.props.profile.email;
      addLead(this.state.company_name, this.state.phone_number, this.state.cardholder_name, this.state.contact_name, this.state.contact_email, this.state.account_number, am_name, am_email);
    } else {
      alert('There was an error finding your account info. Please notify your supervisor or the product team.')
    }
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
    return (
      <div className="App">
        <div className="am-page-wrapper">
          <div className="am-page-form">
          <div className="am-selection-wrapper">
          <button onClick={this.logout}>Logout</button>
          </div>
          <span className="am-page-form-title">Marketing Emails</span>
          <form action="https://go.pardot.com/l/323461/2019-02-12/h87d3" method="post">
            <div className="am-page-form-column-wrapper">
              <div className="am-page-form-column column-1">
                <div className="checkbox-wrapper">
                  <input type="checkbox" name="am_email_options" value="Swipe Smarter Promotion" />
                  <p>Swipe Smarter</p>
                </div>
                <div className="checkbox-wrapper">
                  <input type="checkbox" name="am_email_options" value="Tax Refund (DPS)" />
                  <p>Tax Refund (DPS)</p>
                </div>
                <div className="checkbox-wrapper">
                  <input type="checkbox" name="am_email_options" value="Tax Refund (FIS)" />
                  <p>Tax Refund (FIS)</p>
                </div>
                <div className="text-input-wrapper">
                  <p>Cardholder First Name</p>
                  <input required name="cardholder_name" />
                </div>
              </div>
              <div className="am-page-form-column column-2">
                <div className="text-input-wrapper">
                  <p>Cardholder Email</p>
                  <input required name="cardholder_email" />
                </div>
                <input hidden name="" />
              </div>
            </div>
            <div className="am-page-form-submit-button-wrapper">
            <button className="am-page-form-submit-button" type="submit">Send</button>
            </div>
          </form> 
        </div>
        <div className="am-page-form">
          <span className="am-page-form-title">2nd Job Lead</span>
          <form>
            <div className="am-page-form-column-wrapper">
              <div className="am-page-form-column column-1">
                <div className="text-input-wrapper">
                  <p>Company Name</p>
                  <input onChange={this.handleCompanyName} name="company_name" />
                </div>
                <div className="text-input-wrapper">
                  <p>Business Phone Number</p>
                  <input onChange={this.handlePhoneNumber} name="business_phone_number" />
                </div>
                <div className="text-input-wrapper">
                  <p>Referring Cardholder Name</p>
                  <input onChange={this.handleCardholderName} name="referring_cardholder_name" />
                </div>
              </div>
              <div className="am-page-form-column column-2">
                <div className="text-input-wrapper">
                  <p>Contact Name (optional)</p>
                  <input onChange={this.handleContactName} name="contact_name" />
                </div>
                <div className="text-input-wrapper">
                  <p>Contact Email (optional)</p>
                  <input onChange={this.handleContactEmail} name="contact_email" />
                </div>
                <div className="text-input-wrapper">
                  <p>Last 4 of CH Acct #</p>
                  <input onChange={this.handleAccountNumber} name="cardholder_account_number" />
                </div>
              </div>
            </div>
            <div className="am-page-form-submit-button-wrapper">
            <button onClick={this.addLead} className="am-page-form-submit-button">Submit</button>
            </div>
          </form> 
        </div>
        </div>
      </div>
    );
  }
}

export default AmForms;
