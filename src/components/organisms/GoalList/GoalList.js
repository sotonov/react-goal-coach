import React from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

import styles from './GoalList.module.css';
import Goal from '../../molecules/Goal/Goal';
import Button from '../../atoms/Button/Button';
import Label from '../../atoms/Label/Label';
import * as cst from '../../../constants/constants';

const goalList = (props) => {
  const { goals, email, handleClearAllClick, handleCompleteClick, handleDeleteClick } = props;

  let openGoals, completedGoals;
  // console.log(this.props.goals);
  if (goals.length) {
    openGoals = goals.filter(goal => !goal.completedBy).map( opnGoal => {
      // console.log('opnGoal', opnGoal);
      return (
        <div key={opnGoal.key} className={styles.uncompletedGoal}>
          <Goal goal={opnGoal} />
          <Button
            handleClick={() => handleCompleteClick(opnGoal.key, email)}
            content={<FiCheck />}
            cmplt />

          <Button
            handleClick={() => handleDeleteClick(opnGoal.key)}
            content={<FiX />}
            dlt />
        </div>
      );
    });

    completedGoals = goals.filter(goal => goal.completedBy).map( ctdGoal => {
      return (
        <div key={ctdGoal.key} className={styles.completedGoal}>
          <Goal goal={ctdGoal} />
          <Button
            handleClick={() => handleDeleteClick(ctdGoal.key)}
            content={<FiX />}
            dlt />
        </div>
      );
    });
  }
  return (
    <div className={styles.goalList}>
      <div className={styles.uncompletedGoals}>
        <Label content={cst.UNCOMPLETED_GOALS_LABEL} goals/>
        <div>{openGoals}</div>
      </div>
      <div className={styles.completedGoals}>
        <Label content={cst.COMPLETED_GOALS_LABEL} goals/>
        <div>{completedGoals}</div>
        <Button
          content={cst.CLEAR_ALL}
          handleClick={handleClearAllClick}
          clear />

      </div>
    </div>
  )
}

export default goalList;
