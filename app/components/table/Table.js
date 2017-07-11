// @flow
import React, { Component } from 'react';
import Table, {
  TableBody,
  TableHead,
  TableCell,
  TableRow
} from 'material-ui/Table';
import type { RowData } from './types';

type RowType =
  | Component<mixed, mixed, mixed>;

export default class extends Component {
  props: {
    rows: Array<RowData>,
    columns: Array<string>,
    rowType: Component<mixed, mixed, mixed>
  };

  render() {
    const { rows, columns, rowType } = this.props;
    return (
      <Table>
        <TableHead><TableRow>
          {columns.map(col =>
            <TableCell key={`t-header-${col}`}>{col}</TableCell>)}
        </TableRow></TableHead>
        <TableBody>
          {rows.map(row =>
            <rowType columns={columns} row={row} key={row.id} />
          )}
        </TableBody>
      </Table>
    );
  }
}
