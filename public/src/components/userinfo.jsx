import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class UserInfo extends Component {
  componentWillMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div>{this.props.data}</div>
    );
  }
}

function mapStateToProps(state) {
  return { data: state.auth.message };
}


export default connect(mapStateToProps, actions)(UserInfo);
