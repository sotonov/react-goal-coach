import * as React from 'react';
import Message from '../../atoms/Message/Message';

import styles from './Goal.module.css';

interface GoalProps {
  completedBy: string;
  createdBy: string;
  key: string;
  text: string;
}

const Goal: React.SFC<GoalProps> = (props) => {
  const { text, createdBy, completedBy } = props;

  return (
    <div className={styles.goal}>
      <Message
        goalMessageContent={true}>
        {text}
      </Message>
      <div>
        <Message
          goalMessageAction={true}>
          {completedBy ? 'completed by' : 'submitted by'}
        </Message>
        <Message
          goalMessageMail={true}>
          {completedBy ? completedBy : createdBy}
        </Message>
      </div>
    </div>
  );
};

export default Goal;
