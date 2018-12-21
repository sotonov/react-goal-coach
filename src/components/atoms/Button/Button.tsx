import * as React from 'react';
import classNames from 'classnames/bind';

import styles from './Button.module.css';

export interface ButtonProps {
  children: string | React.ReactNode;
  disabled?: boolean;
  submit?: boolean;
  signin?: boolean;
  signout?: boolean;
  cmplt?: boolean;
  dlt?: boolean;
  clear?: boolean;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const cx = classNames.bind(styles);

const Button: React.SFC<ButtonProps> = (props) => {
  const { disabled, submit, signin, signout, cmplt, dlt, clear, handleClick } = props;

  const className = cx({
    button: true,
    'button--big': signin || signout || submit || clear,
    'button--clear-all': clear,
    'button--complete-goal': cmplt,
    'button--delete-goal': dlt,
    'button--signin': signin,
    'button--signout': signout,
    'button--small': cmplt || dlt,
    'button--submit': submit,
    'button--disabled': disabled,
  })

  return (
    <button
      disabled={disabled}
      className={className}
      onClick={handleClick}>
      {props.children}
    </button>
  );
};

export default Button;
