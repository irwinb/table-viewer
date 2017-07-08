// @flow
import React from 'react';
import { 
  TableCell,
  TableRow 
} from 'material-ui/Table';

export default (props: {
  columns: Array<string>,
  row: {}
}) => (
  <TableRow>
    {props.columns
      .map(col =>
        <TableCell key={`t-cell-${col}`}> 
          {props.row[col]}
        </TableCell>)
    }
  </TableRow>);
