import React, { Component } from 'react';
import '../../styles/App.css';
import LeadsList from '../LeadsList/leads-list';

class AmManagementIndividual extends Component {

  render() {
    return (
      <LeadsList {...this.props} />
    );
  }
}

export default AmManagementIndividual;
