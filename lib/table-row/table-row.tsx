import * as React from 'react';

import BEM from '../utilities/ts/bem';

interface Props {
  children: React.ReactNode;
  className?: string;
  modifiers?: string;
  style?: React.CSSProperties;
}

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
