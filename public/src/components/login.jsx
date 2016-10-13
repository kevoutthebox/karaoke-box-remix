import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class Login extends Component {

  render() {
    return (
      <form>
        <fieldset className="form-group">
          <input className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <input className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <input className="form-control" />
        </fieldset>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errMsg: state.auth.error,
  };
};

function validate(formProps) {
  const error = {};

  return error;
}

export default reduxForm({
  form: 'login',
  fields: ['email', 'password', 'passwordConfirmation']
}, mapStateToProps, actions)(Login)
