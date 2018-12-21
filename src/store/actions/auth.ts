import * as actionTypes from './actionTypes';
import {
  AuthSuccess,
  AuthFail,
  Signout
} from '../types/auth';

import { firebaseApp } from '../../shared/firebase';

export const authSuccess = (email: string): AuthSuccess => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    email
  };
};

export const authFail = (error: string): AuthFail => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const auth = (email: string, password: string, isSignup: boolean): any => {
  return dispatch => {
    if (isSignup) {
      firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
          // console.log('Signed up succesfully.');
          localStorage.setItem('email', email);
          dispatch(authSuccess(email));
        })
        .catch(error => {
          dispatch(authFail(error));
        });
    } else {
      firebaseApp.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          // console.log('Signed in succesfully.');
          localStorage.setItem('email', email)
          dispatch(authSuccess(email));
        })
        .catch(error => {
          dispatch(authFail(error));
        });
    }
  }
}

export const signout = (): Signout => {
  localStorage.removeItem('email');
  return {
    type: actionTypes.SIGNOUT
  };
};

export const authCheckState = (): any => {
  return dispatch => {
    const email = localStorage.getItem('email');
    if (!email) {
      dispatch(signout);
    } else {
      dispatch(authSuccess(email))
    };
  }
}
