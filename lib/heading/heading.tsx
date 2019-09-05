import * as React from 'react';

import { IProps } from './heading.interface';

import namespace from '../utilities/js/namespace';

import * as _ from 'lodash';

const Heading: React.FC<IProps> = props => {
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
