import React, { Component } from 'react';

import { connect } from 'react-redux';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import Header from './components/Header.js';

class Apps extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* 头部组件  */}
          <Header />
        </div>
      </Router>
    );
  }
}

var APP = connect(


)(Apps);

export default APP;
