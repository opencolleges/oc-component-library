import React from 'react';

import { Props } from './uniform.interface';

import namespace from '../utilities/ts/namespace';
import uniform from './utilities/uniform';

import _ from 'lodash';

const Uniform: React.FC<Props> = props => {
  const Tag: keyof JSX.IntrinsicElements = props.tag;
  const device: string = uniform.hasMouse() ? 'no-touchevents' : '';
  const mode: string = props.mode ? props.mode : uniform.getMode();
  const classNames: string = _.trim(
    `${namespace(device, mode)} ${_.toString(props.className)}`
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
