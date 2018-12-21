import * as React from 'react';
import classNames from 'classnames/bind';

import styles from './Label.module.css';

export interface LabelProps {
  children: string;
  auth?: boolean;
  goals?: boolean;
}

const cx = classNames.bind(styles);

const Label: React.SFC<LabelProps> = (props) => {

  const { auth, goals } = props;

  const className = cx({
    label: true,
    'auth__label': auth,
    'goals__label': goals,
  });

  return (
    <span
      className={className}>
      {props.children}
    </span>
  );
};

export default Label;
