import {
  USER_AUTHORIZED,
  USER_UNAUTHORIZED,
  AUTH_ERROR,
  FETCH_MESSAGE
} from '../actions/types';

export default function(state = {}, action) {

  switch (action.type) {
    case USER_AUTHORIZED:
      return { ...state, error: '', authenticated: true };
    case USER_UNAUTHORIZED:
      return {...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload }
  }

  return state;
}
