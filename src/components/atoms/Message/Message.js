import * as React from 'react';

import classNames from 'classnames/bind';

import styles from './Message.module.css';

let cx = classNames.bind(styles);

const Message = (props) => {

  const { content, auth, goals, goalMessageContent, goalMessageAction, goalMessageMail, handleClick } = props;
  // console.log('content', content);

  let className = cx({
    message: true,
    'auth__message': auth,
    'goals__message--greeting': goals,
    'goal__message--content': goalMessageContent,
    'goal__message--action': goalMessageAction,
    'goal__message--mail': goalMessageMail
  });

  return (
    <span
      className={className}
      onClick={handleClick} >
      {content}
    </span>
  );
};

export default Message;
