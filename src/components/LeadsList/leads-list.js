import React, { Component } from 'react';
import '../../styles/App.css';
import '../../styles/am-management.css';
import moment from 'moment';
import 'moment-timezone';

class LeadsList extends Component {

  render() {
    const leadData = this.props.viewReportFor[0].list.map((item) => {
      return (
        <tr>
          <td>{item.company_name}</td>
          <td>{item.company_phone_number}</td> 
          <td>{item.cardholder_name}</td>
          <td>{item.account_number}</td>
          <td>{moment(item.time_added).format('ddd MM/DD/YYYY')}</td>
        </tr>
      )
    })
    return (
      <table className="leads-list">
        <tr>
          <th>Company Name</th>
          <th>Phone Number</th>
          <th>Referring CH Name</th>
          <th>Last 4 of CH Acct</th>
          <th>Date Submitted</th>
        </tr>
        {leadData}
      </table>
    );
  }
}

export default LeadsList;
