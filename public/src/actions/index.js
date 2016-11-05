import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  USER_AUTHORIZED,
  USER_UNAUTHORIZED,
  AUTH_ERROR,
  FETCH_DATA,
} from './types';

const ROOT_URL = 'http://localhost:3000';

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function signupUser({ email, password }) {
  return function (dispatch) {

    axios.post(`${ROOT_URL}/api/signup`, JSON.stringify({ email, password }))
      .then(response => {
        // if post request went through, update state to show authenticated status
        console.log("response", response);
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
      console.log("response login", response);
      dispatch({ type: USER_AUTHORIZED });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/home');
    })
    .catch(() => {
      dispatch(authError('Incorrect credentials'));
    });
  };
}

export function signoutUser() {
  return function(dispatch) {
    console.log(response)
    localStorage.removeItem('token');
    //after removing token from localstorage, remove authorization
    return { type: USER_UNAUTHORIZED };
  }
}

export function fetchData() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/protect`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
          type: FETCH_DATA,
          payload: response.data.message,
      });
    });
  };
}
