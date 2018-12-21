import * as actionTypes from '../actions/actionTypes';
import {
  AuthSuccess,
  AuthFail,
  Signout,
  AuthAction,
  AuthState
} from '../types/auth';
import { updateObject } from '../../shared/utility';

const initialState: AuthState = {
  email: '',
  error: null
}

const authSuccess = (state: AuthState, action: AuthSuccess): AuthState => {
  return updateObject(state, {
    email: action.email
  });
};

const authFail = (state: AuthState, action: AuthFail): AuthState => {
  return updateObject(state, {
    error: action.error
  });
};

const signout = (state: AuthState, action: Signout): AuthState => {
  return updateObject(state, {
    email: ''
  });
};

const reducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.SIGNOUT: return signout(state, action);
    default: return state;
  }
}

export default reducer;
