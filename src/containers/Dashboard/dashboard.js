import React, { Component } from 'react';
import '../../styles/App.css';
import AmManagement from '../AmManagement/am-management';
import AmForms from '../AmForms/am-forms';
import Loading from '../../components/Loading/loading';

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
    if (!this.state.profile) {
      return (<Loading />)
    } else {
      return (
        <section className="App">
          { this.state.profile['http://localhost/user_metadata'].role === 'Manager' ?
            <AmManagement {...this.state} />
            :
            <AmForms {...this.state} />
          }
        </section>
      );
    }
  }
}

export default Dashboard;
