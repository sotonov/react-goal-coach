import * as React from 'react';
import Message from '../../atoms/Message/Message';
import Button from '../../atoms/Button/Button';
import * as cst from '../../../constants/constants';
import classNames from 'classnames/bind';

import styles from './Greeting.module.css';

let cx = classNames.bind(styles);

const Greeting = (props) => {

  const { user, handleClick } = props;
  let className = cx('greeting');

  let messageContent = cst.GREETING_MESSAGE.join(` ${user}`);

  return (
    <div className={className}>
      <Message
        content={messageContent}
        goals />
      <Button
        content='Sign out'
        handleClick={handleClick}
        signout />
    </div>
  );
};

export default Greeting;
