import React, { Component } from 'react';
import '../../styles/App.css';
import AmManagement from '../AmManagement/am-management';
import AmForms from '../AmForms/am-forms';
import Loading from '../../components/Loading/loading';
import moment from 'moment';
import 'moment-timezone';
import { getLeadsForSales, deleteLead, getLeadsForSalesByRep } from '../../services/sales-leads-service';
import * as config from '../../auth_config';
import auth0 from 'auth0-js';

class SalesDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      leadsForSales: null   
    }
  }

  componentDidMount() {
    if (this.props.profile) {
      if (this.props.profile['http://localhost/user_metadata'].role === 'Manager') {
      getLeadsForSales().then((res) => {
        this.setState({
          leadsForSales: res
        })
      });
      } else {
        getLeadsForSalesByRep(this.props.profile.name).then((res) => {
          this.setState({
            leadsForSales: res
          })
        });
      }
    }
  }

  deleteLead(i) {
    deleteLead(this.state.leadsForSales[i].id);
    this.setState({leadsForSales: [...this.state.leadsForSales.slice(0, i), ...this.state.leadsForSales.slice(i+1)]})
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
    let renderAllLeads;
    if (!this.props.profile) {
      return (<Loading />)
    } else {
      if (this.state.leadsForSales) {
        renderAllLeads = this.state.leadsForSales.map((item, i) => {
          return (
            <tr key={i}>
              <td>{item.assigned_sales_rep}</td>
              <td>{item.company_name}</td>
              <td>{item.company_phone_number}</td> 
              <td>{item.contact_name}</td>
              <td>{item.contact_email}</td>
              <td>{moment(item.time_added).format('ddd MM/DD/YYYY')}</td>
              <td>{item.am_name}</td>
              <td><button onClick={() => this.deleteLead(i)}>Delete</button></td>
            </tr>
          )
        })
      }
      return (
        <div className="am-page-wrapper">
          <div className="am-page-form">
            <div className="am-header">
              <p>Welcome {this.props.profile.name}</p>
              <span onClick={this.logout}>Logout</span>
            </div>
            <span className="am-page-form-title">Sales - 2nd Job Leads</span>
          </div>
      <table id="sales-leads-list" className="leads-list">
        <tr>
          <th>Assigned To</th>
          <th>Company Name</th>
          <th>Phone Number</th>
          <th>Contact Name</th>
          <th>Contact Email</th>
          <th>Date Submitted</th>
          <th>Submitted By</th>
        </tr>
        {renderAllLeads}
      </table>
        </div>
      );
    }
  }
}

export default SalesDashboard;
