import * as React from 'react';

interface Props {
  children?: any;
}

const aux: React.SFC<Props> = (props) => props.children;

export default aux;
