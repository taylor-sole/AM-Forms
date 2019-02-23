import React, { Component } from 'react';
import '../../styles/App.css';
import { getAllLeads } from '../../services/leads-service';
import moment from 'moment';
import 'moment-timezone';
import ManagementNav from '../ManagementNav/management-nav';

class AmManagement extends Component {

  constructor(props) {
    super(props);

    this.state = {
      leadsByAm: null,
      leadsPeriodStartDate: null,
      leadsPeriodEndDate: null
    }
    this.sortLeaderboard = this.sortLeaderboard.bind(this);
  }

  filterLeadsByAmName(res) {
      const array_elements = res;
      const arrayWithTotals = [];

      array_elements.sort(function(a, b) {
        return a.am_name - b.am_name;
      });
        
      let current = null;
      let cnt = 0;
      let amLeadList = [];

      for (let i = 0; i < array_elements.length; i++) {
          if (array_elements[i].am_name !== current) {
              if (cnt > 0) {
                arrayWithTotals.push({name: current, total: cnt, list: amLeadList});
              }
              current = array_elements[i].am_name;
              cnt = 1;
              amLeadList = [];
              amLeadList.push(array_elements[i]);
          } else {
            amLeadList.push(array_elements[i]);
            cnt++;
          }
      }
      if (cnt > 0) {
        arrayWithTotals.push({name: current, total: cnt, list: amLeadList});
      }
      this.setState({
        leadsByAm: arrayWithTotals
      })
  }

  componentDidMount() {
    getAllLeads().then((res) => {
      this.filterLeadsByAmName(res);
      this.setState({
        leads: res
      })
    });
  }

  sortLeaderboard(event) {
    console.log(event.target.value)
  }

  render() {
    let allLeads;
    if (this.state.leadsByAm) {
      allLeads = this.state.leadsByAm.map((accountManager, i) => (
      <div>
        <li><strong>{accountManager.name}</strong>: {accountManager.total}</li>
        {/* <ul>
        {accountManager.list.map((lead, i) => (
          <li>Company: {lead.company_name}, 
          Time: {moment.tz(lead.time_added.toString(), "America/Los_Angeles").format('llll')}
          </li>
        ))} 
        </ul> */}
        </div>
      ))
    }

    return (
      <section className="am-management-dashboard-container">
        <ManagementNav {...this.props} />
        <div className="am-page-wrapper">
          <span className="am-page-form-title">2nd Job Leads Report</span>
          <p>Total 2nd Job Leads</p>
          <p>Leaderboard</p>
          <select>
            <option selected disabled>Sort by</option>
            <option onClick={this.sortLeaderboard} value="1">Most to least</option>
            <option onClick={this.sortLeaderboard} value="2">Least to most</option>
            <option onClick={this.sortLeaderboard} value="3">Alphabetical</option>
          </select>
          <ul>
            {allLeads}
          </ul>
        </div>
      </section>
    );
  }
}

export default AmManagement;
