import React, { Component } from 'react';
import '../../styles/App.css';
import { getAllLeads, amDeleteLead } from '../../services/leads-service';
import { getLeadsForSales } from '../../services/sales-leads-service';
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
      todaysDate: null,
      viewReportFor: 'Overall'
    }
    this.handleAmSelection = this.handleAmSelection.bind(this);
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
    const yesterday = await date.setDate(date.getDate() - 1);
    let prevMonday = await date.setDate(date.getDate() - (date.getDay() + 6) % 7);
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
      await this.setState({
        leadsPeriodStartDate: prevMonday,
        leadsPeriodEndDate: today,
        todaysDate: today
      })
    }
    await getAllLeads(moment(this.state.leadsPeriodStartDate).format('MM-DD-YYYY'), moment(this.state.leadsPeriodEndDate).format()).then((res) => {
      this.filterLeadsByAmName(res);
    });
  }

   componentDidMount() {
     this.handleTimePeriod();
    }

    deleteLead(i) {
      amDeleteLead(parseInt(this.state.viewReportFor[0].list[i].id));
      const reportCopy = this.state.viewReportFor.slice(0);
      reportCopy[0].list = [...this.state.viewReportFor[0].list.slice(0, i), ...this.state.viewReportFor[0].list.slice(i+1)]
      this.setState({viewReportFor: reportCopy })
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
            <td><button onClick={() => this.deleteLead(i)}>Delete</button></td>
          </tr>
        )
      })
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
              {
                new Date().getDay() !== 1 ?
                <div>
                  {moment(this.state.leadsPeriodStartDate).format('ddd MM/DD/YYYY')} - {moment(this.state.leadsPeriodEndDate).format('ddd MM/DD/YYYY')}
                </div>
                :
                <select onChange={(e) => {
                  this.handleTimePeriod(e.target.value);
                }}>
                  <option value="last week">
                    {moment(this.state.leadsPeriodStartDate).format('ddd MM/DD/YYYY')} - {moment(this.state.leadsPeriodEndDate).format('ddd MM/DD/YYYY')}
                  </option>
                  <option value="current week">
                    {moment(new Date().setDate(new Date().getDate() - (new Date().getDay() + 6) % 7)).format('ddd MM/DD/YYYY')} - {moment(new Date().setDate(new Date().getDate())).format('ddd MM/DD/YYYY')}
                  </option>
                </select>
              }
            </div>
          </div>
        {
          this.state.viewReportFor === 'Overall' ?
          <AmManagementOverview {...this.state} />
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
