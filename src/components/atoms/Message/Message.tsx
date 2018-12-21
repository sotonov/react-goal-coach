import * as React from 'react';

import classNames from 'classnames/bind';

import styles from './Message.module.css';

export interface MessageProps {
  children: string | React.ReactNode;
  auth?: boolean;
  goals?: boolean;
  goalMessageContent?: boolean;
  goalMessageAction?: boolean;
  goalMessageMail?: boolean;
  handleClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const cx = classNames.bind(styles);

const Message: React.SFC<MessageProps> = (props) => {
  const { auth, goals, goalMessageContent, goalMessageAction, goalMessageMail, handleClick } = props;

  const className = cx({
    message: true,
    'auth__message': auth,
    'goal__message--action': goalMessageAction,
    'goal__message--content': goalMessageContent,
    'goal__message--mail': goalMessageMail,
    'goals__message--greeting': goals,
  });

  return (
    <span
      className={className}
      onClick={handleClick} >
      {props.children}
    </span>
  );
};

export default Message;
