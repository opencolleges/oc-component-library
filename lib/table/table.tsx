import React from 'react';
import BEM, { BEMInterface } from '../utilities/ts/bem';

interface Props {
  children: React.ReactNode;
  className?: string;
  modifiers?: string;
  style?: React.CSSProperties;
}

const Table: React.FC<Props> = (props: Props) => {
  const BEM_MODULE: BEMInterface = BEM(`table`);
  const { addClassNames, addModifiers, getResult }: BEMInterface = BEM_MODULE;

  addModifiers(props.modifiers);
  addClassNames(props.className);

  return (
    <table className={getResult()} style={props.style}>
      {props.children}
    </table>
  );
};

export { Table as default };
