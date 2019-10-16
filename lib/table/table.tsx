import * as React from 'react';

import BEM from '../utilities/ts/bem';

interface Props {
  children: React.ReactNode;
  className?: string;
  modifiers?: string;
  style?: React.CSSProperties;
}

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
