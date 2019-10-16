import React from 'react';

import { Props } from './table.interface';

import BEM from '../utilities/ts/bem';

const Table: React.FC<Props> = props => {
  const bem = BEM('table');
  bem.addModifiers(props.modifiers);
  bem.addClassNames(props.className);

  return (
    <table className={bem.getResult()} style={props.style}>
      {props.children}
    </table>
  );
};

export default Table;
