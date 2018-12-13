import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  goals: [],
  error: null
}

const addGoalSuccess = (state, action) => {
  return updateObject(state, {
    goals: state.goals.concat(action.goal)
  });
};

const addGoalFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
};

const fetchGoalsSuccess = (state, action) => {
  return updateObject(state, {
    goals: action.goals
  })
}

const fetchGoalsFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
};

const completeGoalSuccess = (state, action) => {
  let updatedGoals = [...state.goals];
  const updatedGoalIndex = updatedGoals.findIndex(el => el.key === action.key);
  updatedGoals[updatedGoalIndex] = updateObject(updatedGoals[updatedGoalIndex], {
    completedBy: action.email
  })
  return updateObject(state, {
    goals: updatedGoals
  })
}

const completeGoalFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
};

const deleteGoalSuccess = (state, action) => {
  const updatedGoals = state.goals.filter(el => el.key !== action.key)
  return updateObject(state, {
    goals: updatedGoals
  });
};

const deleteGoalFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
};

const clearCompletedGoalsSuccess = (state, action) => {
  const updatedGoals = state.goals.filter(el => !el.completedBy);
  return updateObject(state, {
    goals: updatedGoals
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_GOAL_SUCCESS: return addGoalSuccess(state, action);
    case actionTypes.ADD_GOAL_FAIL: return addGoalFail(state, action);
    case actionTypes.FETCH_GOALS_SUCCESS: return fetchGoalsSuccess(state, action);
    case actionTypes.FETCH_GOALS_FAIL: return fetchGoalsFail(state, action);
    case actionTypes.COMPLETE_GOAL_SUCCESS: return completeGoalSuccess(state, action);
    case actionTypes.COMPLETE_GOAL_FAIL: return completeGoalFail(state, action);
    case actionTypes.DELETE_GOAL_SUCCESS: return deleteGoalSuccess(state, action);
    case actionTypes.DELETE_GOAL_FAIL: return deleteGoalFail(state, action);
    case actionTypes.CLEAR_COMPLETED_GOALS_SUCCESS: return clearCompletedGoalsSuccess(state, action);
    default: return state;
  }
}

export default reducer;
