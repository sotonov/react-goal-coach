import * as React from 'react';
import Message from '../../atoms/Message/Message';

import styles from './Goal.module.css';

const Goal = (props) => {
  const {goal, createdBy, completedBy} = {...props.goal};
  // console.log('goal', goal);

  return (
    <div className={styles.goal}>
      <Message content={goal} goalMessageContent />
      <div>
        <Message
          content={completedBy ? 'completed by' : 'submitted by' }
          goalMessageAction />
        <Message
          content={completedBy ? completedBy : createdBy}
          goalMessageMail />
      </div>
    </div>
  );
};

export default Goal;
