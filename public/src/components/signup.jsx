import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actionCreators from '../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    // Call signUpUser action creator to sign up and store in DB
    this.props.signUpUser(formProps);
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirmation } } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email Address:</label>
          <input className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password</label>
          <input className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password Confirmation</label>
          <input className="form-control" />
        </fieldset>

        <button className="btn btn-primary" type="submit">Sign me up!</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  return errors;
}

function mapStateToProps(state) {
  return { errorMsg: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirmation'],
  validate
}, mapStateToProps, actionCreators)(Signup);
