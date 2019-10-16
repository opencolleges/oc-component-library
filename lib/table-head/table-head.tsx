import * as React from 'react';

import BEM from '../utilities/ts/bem';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

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
