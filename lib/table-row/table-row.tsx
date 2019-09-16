import * as React from 'react';

import { Props } from './table-row.interface';

import namespace from '../utilities/ts/namespace';
import toModifier from '../utilities/ts/to-modifier';

import * as _ from 'lodash';

const TableRow: React.FC<Props> = props => {
  const classNames: string = _.trim(
    `${namespace('tr', toModifier(props.modifiers, 'tr'))} ${_.toString(
      props.className
    )}`
  );

  return (
    <tr className={classNames} style={props.style}>
      {props.children}
    </tr>
  );
};

export default TableRow;
