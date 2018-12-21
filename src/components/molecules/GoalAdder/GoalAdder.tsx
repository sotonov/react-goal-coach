import * as React from 'react';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import * as cst from '../../../constants/constants';
import classNames from 'classnames/bind';

import styles from './GoalAdder.module.css';

export interface GoalAdderProps {
  text: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const cx = classNames.bind(styles);

const GoalAdder: React.SFC<GoalAdderProps> = (props) => {
  const { text, handleSubmit, handleChange } = props;

  const className = cx('goalAdder');

  return (
    <form
      className={className}
      onSubmit={handleSubmit}>
      <Input
        type='text'
        placeholder={cst.ADD_A_GOAL}
        value={text}
        handleChange={handleChange}
        goals={true} />
      <Button
        submit={true}>
        {cst.SUBMIT}
      </Button>
    </form>
  );
};

export default GoalAdder;
