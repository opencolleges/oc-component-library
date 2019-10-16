import React from 'react';

import { Props } from './table-row.interface';

import BEM from '../utilities/ts/bem';

const TableRow: React.FC<Props> = props => {
  const bem = BEM('tr');
  bem.addModifiers(props.modifiers);
  bem.addClassNames(props.className);

  return (
    <tr className={bem.getResult()} style={props.style}>
      {props.children}
    </tr>
  );
};

export default TableRow;
