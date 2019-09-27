import * as _ from 'lodash';
import * as React from 'react';

import { Props } from './heading.interface';

import BEM from '../utilities/ts/bem';

const Heading: React.FC<Props> = props => {
  const Tag = `h${_.toString(props.level)}` as
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6';

  const bem = BEM(Tag);
  bem.addModifiers(props.modifiers);
  bem.addClassNames(props.className);

  return (
    <Tag className={bem.getResult()} style={props.style}>
      {props.children}
    </Tag>
  );
};

Heading.defaultProps = {
  level: 1
};

export default Heading;
