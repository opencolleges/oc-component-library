import * as _ from 'lodash';
import * as React from 'react';

import namespace from '../utilities/js/namespace';

import ITableRowProps from './table-row.types';

const TableRow: React.FC<ITableRowProps> = props => {
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
