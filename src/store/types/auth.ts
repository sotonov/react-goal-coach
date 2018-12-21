import * as actionTypes from '../actions/actionTypes';

export interface AuthSuccess {
    type: actionTypes.AUTH_SUCCESS;
    email: string;
}

export interface AuthFail {
    type: actionTypes.AUTH_FAIL;
    error: any;
}

export interface Signout {
  type: actionTypes.SIGNOUT;
}

export type AuthAction = AuthSuccess | AuthFail | Signout;

export interface AuthState {
  email: string;
  error: any;
}
