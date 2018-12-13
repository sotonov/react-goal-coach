import * as React from 'react';
import classNames from 'classnames/bind';

import styles from './Title.module.css';

let cx = classNames.bind(styles);

const Title = (props) => {

  const { content, auth, goals } = props;

  let className = cx({
    title: true,
    'auth-title': auth,
    'goals-title': goals,
  });

  return (
    <h1 className={className}>{content}</h1>
  );
};

export default Title;
