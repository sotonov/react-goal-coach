import * as React from 'react';
import classNames from 'classnames/bind';

import styles from './Input.module.css';

let cx = classNames.bind(styles);

const Input = (props) => {

  const { value, type, placeholder, goals, invalid, auth, handleChange } = props;

  let className = cx({
    input: true,
    'goal_adder__input': goals,
    'auth__input': auth,
    'auth__input--invalid': invalid
  });

  console.log('className', className);

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
