import React, { Component } from 'react';
import '../../styles/App.css';
import Loading from '../../components/Loading/loading';
import moment from 'moment';
import 'moment-timezone';
import { getLeadsByAm } from '../../services/leads-service';

class AmStats extends Component {

  render() {
      return (
        <div id="am-stats-container">
          <span className="am-page-form-title">Stats</span>
          <div className="viewing-options-wrapper">
            <div className="item-2">
              <p>For the week of: {moment(this.props.leadsPeriodStartDate).format('ddd MM/DD/YYYY')} - {moment(this.props.leadsPeriodEndDate).format('ddd MM/DD/YYYY')}</p>
              <p className="am-stats-item">2nd Job Leads: {this.props.leadsAmount}</p>
            </div>
          </div>
        </div>
      );
  }
}

export default AmStats;
