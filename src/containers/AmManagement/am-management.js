import React, { Component } from 'react';
import '../../styles/App.css';
import { getAllLeads } from '../../services/leads-service';
import ManagementNav from '../../components/ManagementNav/management-nav';
import AmLeaderboard from '../../components/AmLeaderboard/am-leaderboard';
import moment from 'moment';

class AmManagement extends Component {

  constructor(props) {
    super(props);

    this.state = {
      leadsByAm: null,
      leadsPeriodStartDate: null,
      leadsPeriodEndDate: null
    }
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

  handleTimePeriod() {
    const date = new Date();
    const dayOfWeek = date.getDay();
    const today = moment(date.setDate(date.getDate())).format('ddd MM/DD/YYYY');
    const last7DaysStart = moment().startOf('day').subtract(1,'week').format('ddd MM/DD/YYYY');
    const yesterday = moment(date.setDate(date.getDate() - 1)).format('ddd MM/DD/YYYY');
    let prevMonday = moment(date.setDate(date.getDate() - dayOfWeek)).format('ddd MM/DD/YYYY');
    if (dayOfWeek === 0){
      prevMonday = date.setDate(date.getDate() - 7);
    }
    // If Monday, set period from previous Mon to Sun, for reporting purposes //
    if (dayOfWeek === 1) {
      this.setState({
        leadsPeriodStartDate: last7DaysStart,
        leadsPeriodEndDate: yesterday
      })
    } else {
      this.setState({
        leadsPeriodStartDate: prevMonday,
        leadsPeriodEndDate: today
      })
    }
  }

  componentDidMount() {
    this.handleTimePeriod();
    getAllLeads().then((res) => {
      this.filterLeadsByAmName(res);
      this.setState({
        leads: res
      })
    });
  }

  render() {
    let amList;
    if (this.state.leadsByAm) {
      amList = this.state.leadsByAm.map((accountManager, i) => (
        <option key={i}>{accountManager.name}</option>  
      ))
    }
    return (
      <section className="am-management-dashboard-container">
        <ManagementNav {...this.props} />
        <div className="am-management-page-wrapper">
          <span className="am-page-form-title">2nd Job Leads Report</span>
          <div className="viewing-options-wrapper">
            <div className="item-1">
              <p>Viewing:</p>
              <select>
                <option selected>Overall</option>
                {amList}  
              </select>
            </div>
            <div className="item-2">
              <p>For the week of: {this.state.leadsPeriodStartDate} - {this.state.leadsPeriodEndDate}</p>
            </div>
          </div>
          <AmLeaderboard {...this.state} />
        </div>
      </section>
    );
  }
}

export default AmManagement;
