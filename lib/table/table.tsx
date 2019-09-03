import * as _ from 'lodash';
import * as React from 'react';

import namespace from '../utilities/js/namespace';

import ITableProps from './table.types';

const Table: React.FC<ITableProps> = props => {
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
