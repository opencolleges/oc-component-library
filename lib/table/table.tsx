import * as React from 'react';

import { IProps } from './table.interface';

import namespace from '../utilities/js/namespace';

import * as _ from 'lodash';

const Table: React.FC<IProps> = props => {
  const classNames: string = _.trim(
    `${namespace('table', props.modifiers)} ${_.toString(props.className)}`
  );

  return (
    <table className={classNames} style={props.style}>
      {props.children}
    </table>
  );
};

export default Table;
