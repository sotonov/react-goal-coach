import * as React from 'react';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import * as cst from '../../../constants/constants';
import classNames from 'classnames/bind';

import styles from './GoalAdder.module.css';

let cx = classNames.bind(styles);

const GoalAdder = (props) => {

  const { text, handleSubmit, handleChange } = props;
  let className = cx('goalAdder');

  return (
    <form
      className={className}
      onSubmit={handleSubmit}>
      <Input
        text={text}
        handleChange={handleChange}
      />
      <Button
        handleClick={handleSubmit}
        content={cst.SUBMIT}
        submit />
    </form>
  );
};

export default GoalAdder;
