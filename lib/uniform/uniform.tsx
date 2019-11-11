import _ from 'lodash';
import React from 'react';
import namespace from '../utilities/ts/namespace';
import uniform from './utilities/uniform';

type TagTypes = `div` | `main` | `section`;

interface Props {
  children: React.ReactNode;
  className?: string;
  mode?: string;
  style?: React.CSSProperties;
  tag?: TagTypes;
}

const Uniform: React.FC<Props> = (props: Props) => {
  const Tag: keyof JSX.IntrinsicElements = props.tag;
  const device: string = uniform.hasMouse() ? `no-touchevents` : ``;
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
  tag: `main`
};

export { Uniform as default };
