import React from 'react';
import BEM, { BEMInterface } from '../utilities/ts/bem';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const TableBody: React.FC<Props> = (props: Props) => {
  const BEM_MODULE: BEMInterface = BEM(`tbody`);
  const { addClassNames, getResult }: BEMInterface = BEM_MODULE;

  addClassNames(props.className);

  return (
    <tbody className={getResult()} style={props.style}>
      {props.children}
    </tbody>
  );
};

export { TableBody as default };
