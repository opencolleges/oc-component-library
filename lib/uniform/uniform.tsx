import * as _ from 'lodash';
import * as React from 'react';

import namespace from '../utilities/js/namespace';

import { IUniformProps } from './uniform.types';
import uniform from './utilities/uniform';

const Uniform: React.FC<IUniformProps> = props => {
  const Tag: keyof JSX.IntrinsicElements = props.tag;

  const mode: string = props.mode ? props.mode : uniform.getMode();
  const touch: string = uniform.hasMouse() ? 'no-touchevents' : '';

  const classNames: string = _.trim(
    `${namespace(mode, touch)} ${_.toString(props.className)}`
  );

  return (
    <Tag className={classNames} style={props.style}>
      {props.children}
    </Tag>
  );
};

Uniform.defaultProps = {
  tag: 'main'
};

export default Uniform;
