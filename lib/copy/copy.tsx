import * as React from 'react';

import { Props } from './copy.interface';

import namespace from '../utilities/ts/namespace';
import toModifier from '../utilities/ts/to-modifier';

import * as _ from 'lodash';

const Copy: React.FC<Props> = props => {
  const Tag: keyof JSX.IntrinsicElements = props.tag;

  const classNames: string = _.trim(
    `${namespace(Tag, toModifier(props.modifiers, Tag))} ${_.toString(
      props.className
    )}`
  );

  return (
    <Tag
      className={classNames}
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
