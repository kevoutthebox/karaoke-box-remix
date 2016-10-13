import React, { Component } from 'react';
import Header from './header.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
        Karaoke Box!
        <Header />
        {this.props.children}
      </div>
    );
  }
}
