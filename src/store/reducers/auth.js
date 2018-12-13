import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  email: '',
  error: null
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    email: action.email
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
};

const signout = (state, action) => {
  return updateObject(state, {
    email: ''
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.SIGNOUT: return signout(state, action);
    default: return state;
  }
}

export default reducer;
