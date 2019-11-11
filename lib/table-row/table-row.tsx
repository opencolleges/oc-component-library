import React from 'react';
import BEM, { BEMInterface } from '../utilities/ts/bem';

interface Props {
  children: React.ReactNode;
  className?: string;
  modifiers?: string;
  style?: React.CSSProperties;
}

const TableRow: React.FC<Props> = (props: Props) => {
  const BEM_MODULE: BEMInterface = BEM(`tr`);
  const { addClassNames, addModifiers, getResult }: BEMInterface = BEM_MODULE;

  addModifiers(props.modifiers);
  addClassNames(props.className);

  return (
    <tr className={getResult()} style={props.style}>
      {props.children}
    </tr>
  );
};

export { TableRow as default };
