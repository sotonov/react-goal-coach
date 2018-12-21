import * as React from 'react';
import Message from '../../atoms/Message/Message';
import Button from '../../atoms/Button/Button';
import * as cst from '../../../constants/constants';
import classNames from 'classnames/bind';

import styles from './Greeting.module.css';

export interface GreetingProps {
  user: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const cx = classNames.bind(styles);

const Greeting: React.SFC<GreetingProps> = (props) => {
  const { user, handleClick } = props;

  const className = cx('greeting');

  const messageContent = cst.GREETING_MESSAGE.join(` ${user}`);

  return (
    <div className={className}>
      <Message
        goals={true}>
        {messageContent}
      </Message>
      <Button
        handleClick={handleClick}
        signout={true}>
        {cst.SIGN_OUT}
      </Button>
    </div>
  );
};

export default Greeting;
