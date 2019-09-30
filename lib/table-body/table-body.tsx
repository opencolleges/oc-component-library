import * as React from 'react';

import { Props } from './table-body.interface';

import BEM from '../utilities/ts/bem';

const TableBody: React.FC<Props> = props => {
  const bem = BEM('tbody');
  bem.addClassNames(props.className);

  return (
    <tbody className={bem.getResult()} style={props.style}>
      {props.children}
    </tbody>
  );
};

export default TableBody;
