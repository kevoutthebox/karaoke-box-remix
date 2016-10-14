import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actionCreators from '../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    // Call signUpUser action creator to sign up and store in DB
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errMsg) {
      return (
        <div className="alert alert-danger">
          Sorry {this.props.errMsg}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirmation } } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email Address:</label>
          <input className="form-control" {...email} />
          {email.touched && email.error && <div className="form-error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password</label>
          <input className="form-control" type="password" {...password} />
          {password.touched && password.error && <div className="form-error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password Confirmation</label>
          <input className="form-control" type="password" {...passwordConfirmation} />
          {passwordConfirmation.touched && passwordConfirmation.error && <div className="form-error">{passwordConfirmation.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button className="btn btn-primary" type="submit">Sign me up!</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirmation) {
    errors.passwordConfirmation = 'Please re-enter your password';
  }

  if (formProps.password !== formProps.passwordConfirmation && formProps.passwordConfirmation) {
    errors.password = "The entered passwords do not match"
  }

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
