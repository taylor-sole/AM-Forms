import React, { Component } from 'react';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: {},
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
  
  render() {
    const { profile } = this.state;
    return (
      <div className="container">
      { profile['http://ec2-34-220-113-11.us-west-2.compute.amazonaws.com/user_metadata'] ?
        <div className="profile-area">
          <h1>Hello, {profile.name}</h1>
        </div>
        :
        <div>Loading...</div>
      }
      </div>
    );
  }
}

export default Profile;