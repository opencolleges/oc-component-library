import * as detectIt from 'detect-it';
import * as React from 'react';

import namespace from '../utilities/js/namespace';

import { IUniformProps } from './uniform.types';
import getUniformTheme from './utilities/getUniformTheme';

const Uniform: React.FC<IUniformProps> = props => {
  const Tag: keyof JSX.IntrinsicElements = props.tag;
  const theme: string = getUniformTheme();
  const device: string = detectIt.hasMouse ? 'no-touchevents' : '';
  const classNames: string = `${namespace(theme, device)}${props.className &&
    ` ${props.className}`}`;

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
