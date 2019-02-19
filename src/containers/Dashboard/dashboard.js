import React, { Component } from 'react';
import '../../App.css';
import AmForms from '../AmForms/am-forms';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: null
    }
  }

  componentWillMount() {
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;
    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    return (
      <section>
        <AmForms {...this.state} />
      </section>
    );
  }
}

export default Dashboard;
