import * as React from 'react';

import { Props } from './copy.interface';

import BEM from '../utilities/ts/bem';

const Copy: React.FC<Props> = props => {
  const Tag: keyof JSX.IntrinsicElements = props.tag;

  const bem = BEM(Tag);
  bem.addModifiers(props.modifiers);
  bem.addClassNames(props.className);

  return (
    <Tag
      className={bem.getResult()}
      style={props.style}
      href={Tag === 'a' ? props.href : null}
      target={props.target}
      rel={props.target === '_blank' ? 'noopener noreferrer' : null}
      title={props.title}>
      {props.children}
    </Tag>
  );
};

Copy.defaultProps = {
  tag: 'p'
};

export default Copy;
