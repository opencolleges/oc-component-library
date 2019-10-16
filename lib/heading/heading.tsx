import * as _ from 'lodash';
import * as React from 'react';

import BEM from '../utilities/ts/bem';

type TLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface Props {
  level?: TLevel;
  modifiers?: string;
  className?: string;
  style?: React.CSSProperties;
  children: string;
}

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
