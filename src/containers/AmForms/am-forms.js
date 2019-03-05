import React, { Component } from 'react';
import '../../styles/App.css';
import '../../styles/am-forms.css';
import auth0 from 'auth0-js';
import { addLead, getLeadsByAm } from '../../services/leads-service';
import * as config from '../../auth_config';
import NumberFormat from 'react-number-format';
import ReactLoading from 'react-loading';
import AmStats from '../../components/AmStats/am-stats';
import moment from 'moment';
import 'moment-timezone';
import request from 'request';
import { addLeadForSales } from '../../services/sales-leads-service';

class AmForms extends Component {

  constructor(props) {
    super(props);

    this.state = {
      company_name: '',
      phone_number: '',
      cardholder_name: '',
      contact_name: '',
      contact_email: '',
      account_number: '',
      showLoadingButton: false,
      leadsAmount: null,
      leadsPeriodStartDate: null,
      leadsPeriodEndDate: null
    }
    this.handleTimePeriod = this.handleTimePeriod.bind(this);
    this.handleCompanyName = this.handleCompanyName.bind(this);
    this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
    this.handleCardholderName = this.handleCardholderName.bind(this);
    this.handleContactName = this.handleContactName.bind(this);
    this.handleContactEmail = this.handleContactEmail.bind(this);
    this.handleAccountNumber = this.handleAccountNumber.bind(this);
    this.addLead = this.addLead.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleTimePeriod() {
    const date = new Date();
    const today = date.setDate(date.getDate());
    let prevMonday = date.setDate(date.getDate() - (date.getDay() + 6) % 7);
    this.setState({
      leadsPeriodStartDate: prevMonday,
      leadsPeriodEndDate: today,
    })
  }

  async componentDidMount() {

    await this.handleTimePeriod();
    getLeadsByAm(moment(this.state.leadsPeriodStartDate).format('MM-DD-YYYY'), moment.utc(this.state.leadsPeriodEndDate).format(), this.props.profile.email).then((res) => {
      this.setState({
        leadsAmount: res.length
      })
    });
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
    const salesReps = [
      'Dallas Harmon',
      'Joseph Lundy',
      'Joe O\'Hanlon',
      'Ken Spitzer',
      'Brooke Weltzin',
      'Brandon Umbarger',
      'Dave Richardson',
      'Sharon Conway',
      'Kolton Epperson'
    ]
    if (this.props.profile) {
      const am_name = this.props.profile.name;
      const am_email = this.props.profile.email;
      if (this.state.company_name === '' || this.state.phone_number === '' || this.state.cardholder_name === '' || this.state.account_number === '') {
        alert('A required field is missing.')
      } else {
        this.setState({
          showLoadingButton: true
        });
        addLead(this.state.company_name, this.state.phone_number, this.state.cardholder_name, this.state.contact_name, this.state.contact_email, this.state.account_number, am_name, am_email)
        .then(() => {
          let getRandomRep = salesReps[Math.floor(Math.random() * salesReps.length)];
          addLeadForSales(this.state.company_name, this.state.phone_number, this.state.cardholder_name, this.state.contact_name, this.state.contact_email, this.state.account_number, am_name, am_email, getRandomRep);
          // Add one to total leads //
          let newLeadsAmount = this.state.leadsAmount;
          newLeadsAmount++
          this.setState({
            leadsAmount: newLeadsAmount
          })
          // Reset state and input values //
          document.getElementById("job-lead-form").reset();
          this.setState({
            company_name: '',
            phone_number: '',
            cardholder_name: '',
            contact_name: '',
            contact_email: '',
            account_number: '',
            showLoadingButton: false
          });
          // Temporarily change button text on post success //
          document.getElementById('job-lead-submit-button').disabled = true;
          document.getElementById('job-lead-submit-button').innerText = "Sent!"
          setTimeout(function(){
            document.getElementById('job-lead-submit-button').disabled = false;
            document.getElementById('job-lead-submit-button').innerText = "Submit";
          }, 1500);
        });
      }
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
      <div>
        <div className="am-page-wrapper">
          <div className="am-page-form">
          <div className="am-header">
            <p>Welcome {this.props.profile.name}</p>
            <span onClick={this.logout}>Logout</span>
          </div>
          <AmStats {...this.state} />
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
              </div>
            </div>
            <div className="am-page-form-submit-button-wrapper">
            <button className="am-page-form-submit-button" type="submit">Send</button>
            </div>
          </form>
        </div>
        <div className="am-page-form">
          <span className="am-page-form-title">2nd Job Lead</span>
          <form id="job-lead-form">
            <div className="am-page-form-column-wrapper">
              <div className="am-page-form-column column-1">
                <div className="text-input-wrapper">
                  <p>Company Name</p>
                  <input value={this.state.company_name} onChange={this.handleCompanyName} name="company_name" />
                </div>
                <div className="text-input-wrapper">
                  <p>Business Phone Number</p>
                  <NumberFormat value={this.state.phone_number} format="(###) ###-####" mask="_" onChange={this.handlePhoneNumber} name="business_phone_number" />
                </div>
                <div className="text-input-wrapper">
                  <p>Referring Cardholder Name</p>
                  <input value={this.state.cardholder_name} onChange={this.handleCardholderName} name="referring_cardholder_name" />
                </div>
              </div>
              <div className="am-page-form-column column-2">
                <div className="text-input-wrapper">
                  <p>Contact Name (optional)</p>
                  <input value={this.state.contact_name} onChange={this.handleContactName} name="contact_name" />
                </div>
                <div className="text-input-wrapper">
                  <p>Contact Email (optional)</p>
                  <input value={this.state.contact_email} onChange={this.handleContactEmail} name="contact_email" />
                </div>
                <div className="text-input-wrapper">
                  <p>Last 4 of CH Acct #</p>
                  <NumberFormat format="####" value={this.state.account_number} onChange={this.handleAccountNumber} name="cardholder_account_number" />
                </div>
              </div>
            </div>
            <div className="am-page-form-submit-button-wrapper">
            {
              this.state.showLoadingButton ?
              <ReactLoading type={'spin'} color={'#006ebf'} height={'40px'} width={'40px'} />
              :
              <button onClick={this.addLead} id="job-lead-submit-button" className="am-page-form-submit-button">Submit</button>
            }
            </div>
          </form>
        </div>
        </div>
      </div>
    );
  }
}

export default AmForms;
