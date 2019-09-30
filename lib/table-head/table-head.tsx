import * as React from 'react';

import { Props } from './table-head.interface';

import BEM from '../utilities/ts/bem';

const TableHead: React.FC<Props> = props => {
  const bem = BEM('thead');
  bem.addClassNames(props.className);

  return (
    <thead className={bem.getResult()} style={props.style}>
      {props.children}
    </thead>
  );
};

export default TableHead;
