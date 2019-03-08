import React, { Component } from 'react';
import '../../styles/App.css';
import AmManagement from '../AmManagement/am-management';
import AmForms from '../AmForms/am-forms';
import Loading from '../../components/Loading/loading';
import SalesDashboard from '../../containers/SalesDashboard/sales-dashboard';

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
        profile.name = profile.name.replace(/@.*$/,"").split('.').join(' ');
        profile.name = profile.name.split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
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
      console.log(this.state)
      return (
        <section className="App">
          {
            this.state.profile['https://am-leads.solepaycard.com/user_metadata'] ?
              <div>
                { this.state.profile['https://am-leads.solepaycard.com/user_metadata'].team === 'Sales' ?
                <SalesDashboard {...this.state} />
                :
                <div>
                  { this.state.profile['https://am-leads.solepaycard.com/user_metadata'].role === 'Manager' ?
                    <AmManagement {...this.state} />
                    :
                    <AmForms {...this.state} />
                  }
                </div>
                }
              </div>
            :
            <AmForms {...this.state} />
          }
        </section>
      );
    }
  }
}

export default Dashboard;
