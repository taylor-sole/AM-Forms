import React, { Component } from 'react';
import '../../App.css';
import Loading from '../Loading/loading';

class AuthCallback extends Component {

  render() {

    return (
      <div className="App">
        <Loading />   
      </div>
    );
  }
}

export default AuthCallback;
