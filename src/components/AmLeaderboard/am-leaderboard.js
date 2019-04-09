import React, { Component } from 'react';
import '../../styles/App.css';
import '../../styles/am-management.css';
import moment from 'moment';
import 'moment-timezone';
import Loading from '../Loading/loading';

class AmDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      leaderboardList: null
    }
    this.sortLeaderboard = this.sortLeaderboard.bind(this);
  }

  sortLeaderboard(event) {
    const sortBy = event.target.value;
    let listToSort = this.props.leadsByAm.slice(0);
    if (sortBy === 'desc') {
      listToSort.sort(function(a, b){return b.total-a.total});
      this.setState({
        leaderboardList: listToSort
      })
    } else if (sortBy === 'asc') {
      listToSort.sort(function(a, b){return a.total-b.total});
      this.setState({
        leaderboardList: listToSort
      })
    } else {
      this.setState({
        leaderboardList: this.props.leadsByAm
      })
    }
  }

  render() {
    let allLeads;
    let leadsList;
    if (!this.props.leadsByAm) {
      return (<Loading />)
    } else {
      if (this.props.leadsByAm) {
        if (this.state.leaderboardList === null) {
          leadsList = this.props.leadsByAm
        } else {
          leadsList = this.state.leaderboardList
        }
        allLeads = leadsList.map((accountManager, i) => (
        <tr>
          <td>{accountManager.name}</td>
          <td>{accountManager.total}</td> 
        </tr>
        ))
      }
    
        return (
          <div id="am-leaderboard-section">
            <div className="leaderboard-title-dropdown-contain">
            <p>Leaderboard</p>
            <br />
            <p>Total: <strong>{this.props.totalLeads}</strong></p>
              <select onChange={this.sortLeaderboard}>
                <option selected disabled>Sort by</option>
                <option value='desc'>Most to least</option>
                <option value='asc'>Least to most</option>
                <option value='alphabetical'>Alphabetical</option>
              </select>
            </div>
            <ul className="am-leaderboard-list">
            <table className="leads-list">
              {allLeads}
            </table>
            </ul>

          </div>
        );
      }
    }
}

export default AmDashboard;
