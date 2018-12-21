import * as actionTypes from '../actions/actionTypes';
import {
  AddGoalSuccess,
  AddGoalFail,
  FetchGoalsSuccess,
  FetchGoalsFail,
  CompleteGoalSuccess,
  CompleteGoalFail,
  DeleteGoalSuccess,
  DeleteGoalFail,
  ClearCompletedGoalSuccess,
  GoalsAction,
  GoalsState
} from '../types/goals';
import { updateObject } from '../../shared/utility';

const initialState: GoalsState = {
  goals: [],
  error: null
}

const addGoalSuccess = (state: GoalsState, action: AddGoalSuccess): GoalsState => {
  return updateObject(state, {
    goals: state.goals.concat(action.goal)
  });
};

const addGoalFail = (state: GoalsState, action: AddGoalFail): GoalsState => {
  return updateObject(state, {
    error: action.error
  });
};

const fetchGoalsSuccess = (state: GoalsState, action: FetchGoalsSuccess): GoalsState => {
  return updateObject(state, {
    goals: action.goals
  })
}

const fetchGoalsFail = (state: GoalsState, action: FetchGoalsFail): GoalsState => {
  return updateObject(state, {
    error: action.error
  });
};

const completeGoalSuccess = (state: GoalsState, action: CompleteGoalSuccess): GoalsState => {
  const updatedGoals = [...state.goals];
  const updatedGoalIndex = updatedGoals.findIndex(el => el.key === action.key);
  updatedGoals[updatedGoalIndex] = updateObject(updatedGoals[updatedGoalIndex], {
    completedBy: action.email
  })
  return updateObject(state, {
    goals: updatedGoals
  })
}

const completeGoalFail = (state: GoalsState, action: CompleteGoalFail): GoalsState => {
  return updateObject(state, {
    error: action.error
  });
};

const deleteGoalSuccess = (state: GoalsState, action: DeleteGoalSuccess): GoalsState => {
  const updatedGoals = state.goals.filter(el => el.key !== action.key)
  return updateObject(state, {
    goals: updatedGoals
  });
};

const deleteGoalFail = (state: GoalsState, action: DeleteGoalFail): GoalsState => {
  return updateObject(state, {
    error: action.error
  });
};

const clearCompletedGoalsSuccess = (state: GoalsState, action: ClearCompletedGoalSuccess): GoalsState => {
  const updatedGoals = state.goals.filter(el => !el.completedBy);
  return updateObject(state, {
    goals: updatedGoals
  });
};

const reducer = (state: GoalsState = initialState, action: GoalsAction): GoalsState => {
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
