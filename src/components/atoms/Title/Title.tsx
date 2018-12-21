import * as React from 'react';
import classNames from 'classnames/bind';

import styles from './Title.module.css';

export interface TitleProps {
  children: string;
  auth?: boolean;
  goals?: boolean;
}

const cx = classNames.bind(styles);

const Title: React.SFC<TitleProps> = (props) => {

  const { auth, goals } = props;

  const className = cx({
    title: true,
    'auth-title': auth,
    'goals-title': goals,
  });

  return (
    <h1 className={className}>{props.children}</h1>
  );
};

export default Title;
