import _ from 'lodash';
import React from 'react';
import BEM, { BEMInterface } from '../utilities/ts/bem';

type LevelTypes = 1 | 2 | 3 | 4 | 5 | 6;

interface Props {
  level?: LevelTypes;
  modifiers?: string;
  className?: string;
  style?: React.CSSProperties;
  children: string;
}

const Heading: React.FC<Props> = (props: Props) => {
  const Tag = `h${_.toString(props.level)}` as
    | `h1`
    | `h2`
    | `h3`
    | `h4`
    | `h5`
    | `h6`;

  const BEM_MODULE: BEMInterface = BEM(Tag);
  const { addClassNames, addModifiers, getResult }: BEMInterface = BEM_MODULE;

  addModifiers(props.modifiers);
  addClassNames(props.className);

  return (
    <Tag className={getResult()} style={props.style}>
      {props.children}
    </Tag>
  );
};

Heading.defaultProps = {
  level: 1
};

export { Heading as default };
