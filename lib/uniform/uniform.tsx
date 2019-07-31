import * as detectIt from 'detect-it';
import * as React from 'react';

import namespace from '../utilities/js/namespace';

import { IUniformProps } from './uniform.types';
import getUniformTheme from './utilities/getUniformTheme';

const Uniform: React.FC<IUniformProps> = props => {
  const Tag: keyof JSX.IntrinsicElements = props.tag;
  const theme: string = getUniformTheme();
  const device: string = detectIt.hasMouse ? 'no-touchevents' : '';
  const class_names: string = `${namespace(theme, device)}${props.className &&
    ` ${props.className}`}`;

  return (
    <Tag className={class_names} style={props.style}>
      {props.children}
    </Tag>
  );
};

Uniform.defaultProps = {
  tag: 'main'
};

export default Uniform;
