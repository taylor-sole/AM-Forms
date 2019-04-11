import React, { Component } from 'react';
import '../../styles/App.css';
import { getAllLeads, amDeleteLead } from '../../services/leads-service';
import ManagementNav from '../../components/ManagementNav/management-nav';
import moment from 'moment';
import 'moment-timezone';
import AmManagementOverview from '../../components/AmManagementOverview/am-management-overview';

class AmManagement extends Component {

  constructor(props) {
    super(props);

    this.state = {
      leadsByAm: null,
      leadsPeriodStartDate: null,
      leadsPeriodEndDate: null,
      lastWeekStart: null,
      lastWeekEnd: null,
      todaysDate: null,
      viewReportFor: 'Overall',
      totalLeads: null,
      timePeriodSelected: 'current week',
      leaderboardList: null,
      sortByValue: null
    }
    this.handleAmSelection = this.handleAmSelection.bind(this);
    this.sortLeaderboard = this.sortLeaderboard.bind(this);
    this.handleSortByValue = this.handleSortByValue.bind(this);
  }

  async handleSortByValue(event) {
    await this.setState({
      sortByValue: event.target.value
    })
    await this.sortLeaderboard(this.state.sortByValue);
  }

  sortLeaderboard(valueToSortBy) {
    let listToSort = this.state.leadsByAm.slice(0);
    if (valueToSortBy === 'desc') {
      listToSort.sort(function(a, b){return b.total-a.total});
      this.setState({
        leaderboardList: listToSort
      })
    } else if (valueToSortBy === 'asc') {
      listToSort.sort(function(a, b){return a.total-b.total});
      this.setState({
        leaderboardList: listToSort
      })
    } else {
      this.setState({
        leaderboardList: this.state.leadsByAm
      })
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

   async handleTimePeriod(selectedTime) {
    const date = await new Date();
    const dayOfWeek = await date.getDay();
    const today = await date.setDate(date.getDate());
    const last7DaysStart = await moment().startOf('day').subtract(1,'week');
    const lastWeekStart = await moment().startOf('day').subtract((6 + dayOfWeek),'day');
    const yesterday = await date.setDate(date.getDate() - 1);
    let prevMonday = await date.setDate(date.getDate() - (date.getDay() + 6) % 7);
    let prevSunday = await date.setDate(date.getDate() - (date.getDay() + 7) % 7);
    if (dayOfWeek === 1) {
      if (selectedTime === 'current week') {
        await this.setState({
          leadsPeriodStartDate: today,
          leadsPeriodEndDate: today,
          todaysDate: today
        })
      } else {
        await this.setState({
          leadsPeriodStartDate: last7DaysStart,
          leadsPeriodEndDate: yesterday
        })
      }
    } else {
        if (selectedTime === 'last week') {
          await this.setState({
            leadsPeriodStartDate: lastWeekStart,
            leadsPeriodEndDate: prevSunday
          })
        } else {
          await this.setState({
            leadsPeriodStartDate: prevMonday,
            leadsPeriodEndDate: today,
            todaysDate: today
          })
        }
      }
      this.setState({
        lastWeekStart: lastWeekStart,
        lastWeekEnd: prevSunday
      })
    await getAllLeads(moment(this.state.leadsPeriodStartDate).format('MM-DD-YYYY'), moment(this.state.leadsPeriodEndDate).format()).then((res) => {
      this.setState({
        totalLeads: res.length
      })
      this.filterLeadsByAmName(res);
    });
    if (this.state.sortByValue !== null) {
      await this.sortLeaderboard(this.state.sortByValue);
    }
  }

   componentDidMount() {
     this.handleTimePeriod();
    }

    deleteLead(i) {
      amDeleteLead(this.state.viewReportFor[0].list[i].id);
      const reportCopy = this.state.viewReportFor.slice(0);
      reportCopy[0].list = [...this.state.viewReportFor[0].list.slice(0, i), ...this.state.viewReportFor[0].list.slice(i+1)]
      this.setState({viewReportFor: reportCopy})
    }

  handleAmSelection(event) {
    if (event.target.value === 'Overall') {
      this.setState({
        viewReportFor: event.target.value
      })
    } else {
      const leadsArrCopy = this.state.leadsByAm.slice(0);
      const selectedAm = leadsArrCopy.filter(item => item.name === event.target.value);
      this.setState({
        viewReportFor: selectedAm
      })
    }
  }

  render() {
    let amList;
    let leadData;
    if (this.state.leadsByAm) {
      amList = this.state.leadsByAm.map((accountManager, i) => (
        <option value={accountManager.name} key={i}>{accountManager.name}</option>  
      ))
    }
    if (this.state.viewReportFor !== 'Overall') {
      leadData = this.state.viewReportFor[0].list.map((item, i) => {
        return (
          <tr key={i}>
            <td>{item.company_name}</td>
            <td>{item.company_phone_number}</td> 
            <td>{item.cardholder_name}</td>
            <td>{item.account_number}</td>
            <td>{moment(item.time_added).format('ddd MM/DD/YYYY')}</td>
            {/* <td><button onClick={() => this.deleteLead(i)}>Delete</button></td> */}
          </tr>
        )
      })
    }

    let allLeads;
    let leadsList;
      if (this.state.leadsByAm) {
        if (this.state.leaderboardList === null) {
          leadsList = this.state.leadsByAm.slice(0)
        } else {
          leadsList = this.state.leaderboardList.slice(0)
        }
        allLeads = leadsList.map((accountManager, i) => (
        <tr>
          <td>{accountManager.name}</td>
          <td>{accountManager.total}</td> 
        </tr>
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
              <select onChange={this.handleAmSelection}>
                <option selected>Overall</option>
                {amList}
              </select>
            </div>
            <div className="item-2">
              <p>For the week of: </p>
                <select onChange={(e) => {
                  this.setState({
                    timePeriodSelected: e.target.value
                  })
                  this.handleTimePeriod(e.target.value);
                }}>
                  <option value="current week">
                    {moment(new Date().setDate(new Date().getDate() - (new Date().getDay() + 6) % 7)).format('ddd MM/DD/YYYY')} - {moment(new Date().setDate(new Date().getDate())).format('ddd MM/DD/YYYY')}
                  </option>
                  <option value="last week">
                    {moment(this.state.lastWeekStart).format('ddd MM/DD/YYYY')} - {moment(this.state.lastWeekEnd).format('ddd MM/DD/YYYY')}
                  </option>
                </select>
            </div>
          </div>
        {
          this.state.viewReportFor === 'Overall' ?
          // <AmManagementOverview {...this.state} />
          <div id="am-leaderboard-section">
          <div className="leaderboard-title-dropdown-contain">
          <p>Leaderboard</p>
            <select onChange={this.handleSortByValue}>
              <option selected disabled>Sort by</option>
              <option value='desc'>Most to least</option>
              <option value='asc'>Least to most</option>
              <option value='alphabetical'>Alphabetical</option>
            </select>
          </div>
          <ul className="am-leaderboard-list">
          <p><strong>Total: {this.state.totalLeads}</strong></p>
          <table className="leads-list">
            {allLeads}
          </table>
          </ul>
        </div>
        :
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
        }
        </div>
      </section>
    );
  }
}

export default AmManagement;
