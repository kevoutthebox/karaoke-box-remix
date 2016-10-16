import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class Login extends Component {
  handleFormSubmit({ email, password }) {
    //call action creator to log users in
    this.props.loginUser({ email, password });
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirmation } } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email Address:</label>
          <input className="form-control" {...email} />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input className="form-control" type="password" {...password} />
        </fieldset>
        <fieldset className="form-group">
          <label>Password Confirmation:</label>
          <input className="form-control" type="password" {...passwordConfirmation} />
          {password.touched && passwordConfirmation.touched && passwordConfirmation.error && <div className="form-error">{passwordConfirmation.error}</div>}
        </fieldset>
        <button className="btn btn-primary" type="submit">Login</button>
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
  const errors = {};

  if (formProps.password !== formProps.passwordConfirmation && formProps.passwordConfirmation) {
    errors.password = "Passwords do not match"
    errors.passwordConfirmation = "Passwords do not match"
  }

  return errors;
}

export default reduxForm({
  form: 'login',
  fields: ['email', 'password', 'passwordConfirmation'],
  validate
}, mapStateToProps, actions)(Login)
