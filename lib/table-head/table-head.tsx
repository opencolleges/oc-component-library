import React from 'react';
import BEM, { BEMInterface } from '../utilities/ts/bem';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const TableHead: React.FC<Props> = (props: Props) => {
  const BEM_MODULE: BEMInterface = BEM(`thead`);
  const { addClassNames, getResult }: BEMInterface = BEM_MODULE;

  addClassNames(props.className);

  return (
    <thead className={getResult()} style={props.style}>
      {props.children}
    </thead>
  );
};

export { TableHead as default };
