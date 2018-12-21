import * as React from 'react';
import classNames from 'classnames/bind';

import styles from './Input.module.css';

export interface InputProps {
  value?: string;
  type: string;
  placeholder: string;
  goals?: boolean;
  invalid?: boolean;
  auth?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const cx = classNames.bind(styles);

const Input: React.SFC<InputProps> = (props) => {

  const { value, type, placeholder, goals, invalid, auth, handleChange } = props;

  const className = cx({
    input: true,
    'auth__input': auth,
    'auth__input--invalid': invalid,
    'goal_adder__input': goals,
  });

  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default Input;
