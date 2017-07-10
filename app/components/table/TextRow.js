// @flow
import React from 'react';
import {
  TableCell,
  TableRow
} from 'material-ui/Table';
import type { RowData } from './types';

export default (props: {
  columns: Array<string>,
  row: RowData
}) => (
  <TableRow>
    {props.columns
      .map(col =>
        (<TableCell key={`t-cell-${props.row.id}-${col}`}>
          {props.row[col]}
        </TableCell>))
    }
  </TableRow>);
