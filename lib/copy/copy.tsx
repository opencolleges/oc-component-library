import React from 'react';

import BEM from '../utilities/ts/bem';

type TTag =
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
  tag?: TTag;
  target?: string;
  title?: string;
}

const Copy: React.FC<Props> = props => {
  const Tag: keyof JSX.IntrinsicElements = props.tag;

  const bem = BEM(Tag);
  bem.addModifiers(props.modifiers);
  bem.addClassNames(props.className);

  return (
    <Tag
      className={bem.getResult()}
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
