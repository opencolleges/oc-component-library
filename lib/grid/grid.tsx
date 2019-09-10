import * as React from 'react';

import { Props } from './grid.interface';

import namespace from '../utilities/js/namespace';

import * as _ from 'lodash';

const Grid: React.FC<Props> = props => {
  const Tag: keyof JSX.IntrinsicElements = props.tag;

  const classNames: string = _.trim(
    `${namespace('grid', props.modifiers)} ${_.toString(props.className)}`
  );

  return (
    <Tag
      className={classNames}
      style={
        props.maxWidth ? props.style : { maxWidth: '100%', ...props.style }
      }>
      {props.children}
    </Tag>
  );
};

Grid.defaultProps = {
  maxWidth: true,
  tag: 'div'
};

export default Grid;
