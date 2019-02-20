import React, { Component } from 'react';
import ReactLoading from 'react-loading';

class Loading extends Component {

  render() {
    return (
      <div className="App">
        <div className="am-page-wrapper">
          <ReactLoading type={'spin'} color={'#006ebf'} height={'100px'} width={'100px'} />
        </div>
      </div>
    );
  }
}

export default Loading;
