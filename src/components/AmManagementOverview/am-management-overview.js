import React, { Component } from 'react';
import '../../styles/App.css';
import AmLeaderboard from '../../components/AmLeaderboard/am-leaderboard';

class AmManagementOverview extends Component {

  render() {
    return (
      <AmLeaderboard {...this.props} />
    );
  }
}

export default AmManagementOverview;
