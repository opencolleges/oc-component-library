import React from 'react';
import BEM, { BEMInterface } from '../utilities/ts/bem';

type TagTypes =
  | `a`
  | `abbr`
  | `blockquote`
  | `code`
  | `em`
  | `kbd`
  | `li`
  | `mark`
  | `ol`
  | `p`
  | `pre`
  | `small`
  | `span`
  | `strong`
  | `sub`
  | `sup`
  | `ul`;

interface Props {
  children: React.ReactNode;
  className?: string;
  href?: string;
  modifiers?: string;
  style?: React.CSSProperties;
  tag?: TagTypes;
  target?: string;
  title?: string;
}

const Copy: React.FC<Props> = (props: Props) => {
  const Tag: keyof JSX.IntrinsicElements = props.tag;

  const BEM_MODULE: BEMInterface = BEM(Tag);
  const { addClassNames, addModifiers, getResult }: BEMInterface = BEM_MODULE;

  addModifiers(props.modifiers);
  addClassNames(props.className);

  return (
    <Tag
      className={getResult()}
      style={props.style}
      href={Tag === `a` ? props.href : null}
      target={props.target}
      rel={props.target === `_blank` ? `noopener noreferrer` : null}
      title={props.title}>
      {props.children}
    </Tag>
  );
};

Copy.defaultProps = {
  tag: `p`
};

export { Copy as default };
