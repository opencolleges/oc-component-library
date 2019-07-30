import * as React from 'react';

import { IUniformProps } from './uniform.types';
import { getUniformTheme } from './uniform.utilities';

import detectIt from 'detect-it';

import namespace from '../utilities/js/namespace';

const Uniform: React.FC<IUniformProps> = props => {
  const Tag: keyof JSX.IntrinsicElements = props.tag;
  const theme: string = getUniformTheme();
  const context: string = detectIt.hasMouse ? 'no-touchevents' : '';
  const class_names: string = `${namespace(theme, context)}${props.className &&
    ` ${props.className}`}`;

  return (
    <Tag className={class_names} style={props.style}>
      {props.children}
    </Tag>
  );
};

Uniform.defaultProps = {
  tag: 'main',
  className: '',
  style: {}
};

export default Uniform;
