import * as actionTypes from './actionTypes';

import { firebaseApp } from '../../shared/firebase';

export const authSuccess = (email) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    email
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    if (isSignup) {
      firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
          console.log('Signed up succesfully.');
          const {email} = {...res.user};
          localStorage.setItem('email', email);
          dispatch(authSuccess(email));
        })
        .catch(error => {
          dispatch(authFail(error));
        });
    } else {
      firebaseApp.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log('Signed in succesfully.');
          const {email} = {...res.user};
          localStorage.setItem('email', email)
          dispatch(authSuccess(email));
        })
        .catch(error => {
          dispatch(authFail(error));
        });
    }
  }
}

export const signout = () => {
  localStorage.removeItem('email');
  return {
    type: actionTypes.SIGNOUT
  };
};

export const authCheckState = () => {
  return dispatch => {
    const email = localStorage.getItem('email');
    if (!email) {
      dispatch(signout);
    } else {
      dispatch(authSuccess(email))
    };
  }
}
