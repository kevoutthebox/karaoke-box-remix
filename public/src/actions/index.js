import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  USER_AUTHORIZED,
  USER_UNAUTHORIZED,
  AUTH_ERROR,
  FETCH_MESSAGE,
} from './types';

const ROOT_URL = 'http://localhost:3000';

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/signup`, { email, password })
      .then(response => {
        // if post request went through, update state to show authenticated status
        dispatch({ type: USER_AUTHORIZED });
        // Store the JWT in localstorage
        localStorage.setItem('token', response.data.token);
        // Route the user to the homepage
        browserHistory.push('/home');
      })
      .catch((response) => {
        // If post request didn't go throught, display errors
        dispatch(authError(response.data.error));
      });
  };
}

export function loginUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/login`, { email, password })
    .then(response => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem({ 'token': response.data.token });
      browserHistory.push('/home');
    })
    .catch(() => {
      dispatch(authError('Incorrect credentials'));
    });
  };
}

export function signoutUser() {
  return function(dispatch) {
    localStorage.removeItem('token');
    //after removing token from localstorage, remove authorization
    return { type: USER_UNAUTHORIZED };
  }
}
