import * as _ from 'lodash';
import * as React from 'react';

import namespace from '../utilities/js/namespace';

import IHeadingProps from './heading.types';

const Heading: React.FC<IHeadingProps> = props => {
  const Tag = `h${_.toString(props.level)}` as
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6';

  const classNames: string = _.trim(
    `${namespace(Tag, props.modifiers)} ${_.toString(props.className)}`
  );

  return (
    <Tag className={classNames} style={props.style}>
      {props.children}
    </Tag>
  );
};

Heading.defaultProps = {
  level: 1
};

export default Heading;
