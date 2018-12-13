import * as React from 'react';
import classNames from 'classnames/bind';

import styles from './Label.module.css';

let cx = classNames.bind(styles);

const Label = (props) => {

  const { content, auth, goals } = props;

  let className = cx({
    label: true,
    'auth__label': auth,
    'goals__label': goals,
  });

  return (
    <span
      className={className}>
      {content}
    </span>
  );
};

export default Label;
