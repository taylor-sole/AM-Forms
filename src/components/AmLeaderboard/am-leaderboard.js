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
      leaderboardList: null,
      sortByValue: 'alphabetical'
    }
    this.sortLeaderboard = this.sortLeaderboard.bind(this);
  }

  sortLeaderboard(event) {
    let sortBy;
    if (event) {
      this.setState({
        sortByValue: event.target.value
      })
      sortBy = event.target.value;
    } else {
      sortBy = this.state.sortByValue.slice(0);
    }
    let listToSort = this.props.leadsByAm.slice(0);
    if (sortBy === 'desc') {
      listToSort.sort(function(a, b){return b.total-a.total});
      if (sortBy !== 'desc') {
        this.setState({
          leaderboardList: listToSort
        })
      }
    } else if (sortBy === 'asc') {
      listToSort.sort(function(a, b){return a.total-b.total});
      if (sortBy !== 'asc') {
        this.setState({
          leaderboardList: listToSort
        })
      }
    } else {
      this.setState({
        leaderboardList: this.props.leadsByAm
      })
    }
  }

  componentDidUpdate() {
    if (this.props.leadsByAm && this.state.sortByValue !== null) {
    const sortBy = this.state.sortByValue.slice(0);
    let listToSort = this.props.leadsByAm.slice(0);
    if (sortBy === 'desc') {
      listToSort.sort(function(a, b){return b.total-a.total});
      if (sortBy !== 'desc') {
        this.setState({
          leaderboardList: listToSort
        })
      }
    } else if (sortBy === 'asc') {
      listToSort.sort(function(a, b){return a.total-b.total});
      if (sortBy !== 'asc') {
        this.setState({
          leaderboardList: listToSort
        })
      }
    } else {
      this.setState({
        leaderboardList: this.props.leadsByAm
      })
    }
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
              <select onChange={this.sortLeaderboard}>
                <option selected disabled>Sort by</option>
                <option value='desc'>Most to least</option>
                <option value='asc'>Least to most</option>
                <option value='alphabetical'>Alphabetical</option>
              </select>
            </div>
            <ul className="am-leaderboard-list">
            <p><strong>Total: {this.props.totalLeads}</strong></p>
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
