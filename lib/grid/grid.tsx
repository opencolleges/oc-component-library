import React from 'react';
import BEM, { BEMInterface } from '../utilities/ts/bem';

type TagTypes = `div` | `section`;

interface Props {
  children: React.ReactNode;
  className?: string;
  maxWidth?: boolean;
  modifiers?: string;
  style?: React.CSSProperties;
  tag?: TagTypes;
}

const Grid: React.FC<Props> = (props: Props) => {
  const Tag: keyof JSX.IntrinsicElements = props.tag;

  const BEM_MODULE: BEMInterface = BEM(`grid`);
  const { addClassNames, addModifiers, getResult }: BEMInterface = BEM_MODULE;

  addModifiers(props.modifiers);
  addClassNames(props.className);

  return (
    <Tag
      className={getResult()}
      style={
        !!props.maxWidth ? props.style : { maxWidth: `100%`, ...props.style }
      }>
      {props.children}
    </Tag>
  );
};

Grid.defaultProps = {
  maxWidth: true,
  tag: `div`
};

export { Grid as default };
