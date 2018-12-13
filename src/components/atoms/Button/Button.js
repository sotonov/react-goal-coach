import * as React from 'react';
import classNames from 'classnames/bind';

import styles from './Button.module.css';

let cx = classNames.bind(styles);

const Button = (props) => {
  const { content, handleClick, submit, signin, signout, cmplt, dlt, clear } = props;

  let className = cx({
    button: true,
    'button--big': signin || signout || submit || clear,
    'button--small': cmplt || dlt,
    'button--signin': signin,
    'button--signout': signout,
    'button--submit': submit,
    'button--clear-all': clear,
    'button--complete-goal': cmplt,
    'button--delete-goal': dlt
  })

  return (
    <button
      className={className}
      onClick={handleClick}>
      {content}
    </button>
  );
};

export default Button;
