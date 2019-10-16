import * as React from 'react';

import BEM from '../utilities/ts/bem';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

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
