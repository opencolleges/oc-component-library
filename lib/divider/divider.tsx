import React from 'react';
import BEM, { BEMInterface } from '../utilities/ts/bem';

interface Props {
  className?: string;
  modifiers?: string;
  style?: React.CSSProperties;
}

const Divider: React.FC<Props> = props => {
  const BEM_MODULE: BEMInterface = BEM(`divider`);
  const { addClassNames, addModifiers, getResult }: BEMInterface = BEM_MODULE;

  addModifiers(props.modifiers);
  addClassNames(props.className);

  return <div className={getResult()} style={props.style} aria-hidden="true" />;
};

Divider.defaultProps = {
  modifiers: `s`
};

export { Divider as default };
