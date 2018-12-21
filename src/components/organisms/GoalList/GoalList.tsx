import * as React from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

import styles from './GoalList.module.css';
import Goal from '../../molecules/Goal/Goal';
import Button from '../../atoms/Button/Button';
import Label from '../../atoms/Label/Label';
import { GoalType } from '../../../store/types/goals';
import * as cst from '../../../constants/constants';

interface GoalListProps {
  goals?: GoalType[];
  email: string;
  handleClearAllClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDeleteClick: (e: React.MouseEvent<HTMLButtonElement>, key: string) => void;
  handleCompleteClick: (e: React.MouseEvent<HTMLButtonElement>, key: string, email: string) => void;
}

const GoalList: React.SFC<GoalListProps>  = (props) => {
  const { goals, email, handleClearAllClick, handleCompleteClick, handleDeleteClick } = props;

  let openGoals;
  let completedGoals;

  if (goals && goals.length) {
    openGoals = goals.filter(goal => !goal.completedBy).map( opnGoal => {
      return (
        <div key={opnGoal.key} className={styles.uncompletedGoal}>
          <Goal {...opnGoal} />
          <Button
            handleClick={e => handleCompleteClick(e, opnGoal.key, email)}
            cmplt={true}>
            {<FiCheck />}
          </Button>
          <Button
            handleClick={e => handleDeleteClick(e, opnGoal.key)}
            dlt={true}>
            {<FiX />}
          </Button>
        </div>
      );
    });

    completedGoals = goals.filter(goal => goal.completedBy).map( ctdGoal => {
      return (
        <div key={ctdGoal.key} className={styles.completedGoal}>
          <Goal {...ctdGoal} />
          <Button
            handleClick={e => handleDeleteClick(e, ctdGoal.key)}
            dlt={true}>
            {<FiX />}
          </Button>
        </div>
      );
    });
  }

  const isButtonDisabled = !(completedGoals && completedGoals.length);

  return (
    <div className={styles.goalList}>
      <div className={styles.uncompletedGoals}>
        <Label
          goals={true}>
          {cst.UNCOMPLETED_GOALS_LABEL}
        </Label>
        <div>{openGoals}</div>
      </div>
      <div className={styles.completedGoals}>
        <Label
          goals={true}>
          {cst.COMPLETED_GOALS_LABEL}
        </Label>
        <div>{completedGoals}</div>
        <Button
          disabled={isButtonDisabled}
          handleClick={handleClearAllClick}
          clear={true}>
          {cst.CLEAR_ALL}
        </Button>
      </div>
    </div>
  )
}

export default GoalList;
