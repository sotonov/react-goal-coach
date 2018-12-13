import * as React from 'react';
import classNames from 'classnames/bind';

import styles from './Input.module.css';

let cx = classNames.bind(styles);

const Input = (props) => {

  const { text, handleChange } = props;
  let className = cx('input');

  return (
    <input
      className={className}
      type='text'
      placeholder='Add a goal'
      value={text}
      onChange={handleChange}
    />
  );
};

export default Input;
