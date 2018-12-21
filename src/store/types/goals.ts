import * as actionTypes from '../actions/actionTypes';

export type GoalType {
  completedBy: string;
  createdBy: string;
  key: string;
  text: string;
}
export type AddedGoalType {
  completedBy: string;
  createdBy: string;
  text: string;
}

export interface AddGoalSuccess {
  type: actionTypes.ADD_GOAL_SUCCESS;
  goal: GoalType;
}

export interface AddGoalFail {
  type: actionTypes.ADD_GOAL_FAIL;
  error: string | null;
}

export interface FetchGoalsSuccess {
  type: actionTypes.FETCH_GOALS_SUCCESS;
  goals: GoalType[];
}

export interface FetchGoalsFail {
  type: actionTypes.FETCH_GOALS_FAIL;
  error: string | null;
}

export interface CompleteGoalSuccess {
  type: actionTypes.COMPLETE_GOAL_SUCCESS;
  key: string;
  email: string;
}

export interface CompleteGoalFail {
  type: actionTypes.COMPLETE_GOAL_FAIL;
  error: string | null;
}

export interface DeleteGoalSuccess {
  type: actionTypes.DELETE_GOAL_SUCCESS;
  key: string;
}

export interface DeleteGoalFail {
  type: actionTypes.DELETE_GOAL_FAIL;
  error: string | null;
}

export interface ClearCompletedGoalSuccess {
  type: actionTypes.CLEAR_COMPLETED_GOALS_SUCCESS;
}

export type GoalsAction = AddGoalSuccess
  | AddGoalFail
  | FetchGoalsSuccess
  | FetchGoalsFail
  | CompleteGoalSuccess
  | CompleteGoalFail
  | DeleteGoalSuccess
  | DeleteGoalFail
  | ClearCompletedGoalSuccess;

export interface GoalsState {
    goals: GoalType[];
    error: string | null;
  }
