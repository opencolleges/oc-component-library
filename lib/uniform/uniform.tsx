import React from 'react';
import addNamespace from '../utilities/ts/add-namespace';
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
  const mode: string = !!props.mode ? props.mode : uniform.getMode();
  const classNames: string = `${addNamespace(
    !!device ? `${device} ${mode}` : mode
  )}${!!props.className ? ` ${props.className}` : ``}`;

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
