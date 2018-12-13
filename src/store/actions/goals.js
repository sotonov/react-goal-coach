import * as actionTypes from './actionTypes';
import { database } from '../../shared/firebase';
import { updateObject } from '../../shared/utility';

const goalsRef = database.ref('goals');

const addGoalSuccess = (goal) => {
  return {
    type: actionTypes.ADD_GOAL_SUCCESS,
    goal
  }
}

const addGoalFail = (error) => {
  return {
    type: actionTypes.ADD_GOAL_FAIL,
    error
  }
}

export const addGoal = (goal) => {
  return dispatch => {
    const postKey = database.ref().child('goals').push().key;
    const goalWithKey = updateObject(goal, {
      key: postKey
    });
    let updates = {};
    updates[`/goals/${postKey}`] = goal;;
    database.ref().update(updates)
      .then(res => {
        console.log('Uploading a goal...');
        dispatch(addGoalSuccess(goalWithKey));
      })
      .catch(error => {
        dispatch(addGoalFail(error))
      })
  }
}

const fetchGoalsSuccess = (goals) => {
  return {
    type: actionTypes.FETCH_GOALS_SUCCESS,
    goals
  }
}

const fetchGoalsFail = (error) => {
  return {
    type: actionTypes.FETCH_GOALS_FAIL,
    error
  }
}

export const fetchGoals = () => {
  return dispatch => {
    console.log('Fetching goals...');
    goalsRef.once('value')
      .then(snapshot => {
        let goals = [];
        snapshot.forEach(child => {
          const { goal, createdBy, completedBy } = child.val();
          const key = child.key;
          goals.push({
            goal,
            createdBy,
            completedBy,
            key
          })
        })
        return goals;
      })
        .then(goals => {
          dispatch(fetchGoalsSuccess(goals))})
        .catch(error => {
          dispatch(fetchGoalsFail(error))
      })
  }
}

const completeGoalSuccess = (key, email) => {
  return {
    type: actionTypes.COMPLETE_GOAL_SUCCESS,
    key,
    email
  }
}

const completeGoalFail = (error) => {
  return {
    type: actionTypes.COMPLETE_GOAL_FAIL,
    error
  }
}

export const completeGoal = (key, email) => {
  return dispatch => {
    console.log('Trying to complete the goal...');
    database.ref(`/goals/${key}`).update({completedBy: email})
      .then(res => {
        console.log('Completing a goal...');
        dispatch(completeGoalSuccess(key, email));
      })
      .catch(error => {
        dispatch(completeGoalFail(error))
      })
  }
}

const deleteGoalSuccess = (key) => {
  return {
    type: actionTypes.DELETE_GOAL_SUCCESS,
    key
  }
}

const deleteGoalFail = (error) => {
  return {
    type: actionTypes.DELETE_GOAL_FAIL,
    error
  }
}

export const deleteGoal = (key) => {
  return dispatch => {
    console.log('Removing the goal...', key);
    database.ref(`/goals/${key}`).remove()
      .then(res => {
        console.log('Completing a goal...');
        dispatch(deleteGoalSuccess(key));
      })
      .catch(error => {
        dispatch(deleteGoalFail(error))
      })
  }
}

const clearCompletedGoalsSuccess = () => {
  return {
    type: actionTypes.CLEAR_COMPLETED_GOALS_SUCCESS
  }
}

export const clearCompletedGoals = (keys) => {
  return dispatch => {
    console.log('Clearing completed goals', keys);
    keys.forEach(key => {
      database.ref(`/goals/${key}`).remove()
      .catch(error => {
        dispatch(deleteGoalFail(error))
      })
    })
    dispatch(clearCompletedGoalsSuccess())
  }
}
