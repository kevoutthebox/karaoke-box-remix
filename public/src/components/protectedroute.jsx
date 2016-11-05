import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function(ComposedComponent) {
  class HigherOrderAuth extends Component {
    // before rendering page, check auth status and redirect if not authenticated
    componentWillMount() {
      if (!this.props.isAuth) {
        browserHistory.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuth) {
        browserHistory.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { isAuth: state.auth.authenticated };
  }

  return connect(mapStateToProps)(HigherOrderAuth);
}
