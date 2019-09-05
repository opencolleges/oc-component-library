import * as React from 'react';

import { IProps } from './table-row.interface';

import namespace from '../utilities/js/namespace';

import * as _ from 'lodash';

const TableRow: React.FC<IProps> = props => {
  const classNames: string = _.trim(
    `${namespace('tr', props.modifiers)} ${_.toString(props.className)}`
  );

  return (
    <tr className={classNames} style={props.style}>
      {props.children}
    </tr>
  );
};

export default TableRow;