// @flow
import React, { Component } from 'react';
import Table, {
  TableBody,
  TableHead,
  TableCell,
  TableRow
} from 'material-ui/Table';

export type RowData = {
  id: string
};

export type RowType = React$Element<*>;

export default class extends Component {
  props: {
    rows: Array<RowData>,
    columns: Array<string>,
    rowType: RowType
  };

  render() {
    const ChildRowType: RowType = this.props.rowType;
    const { rows, columns } = this.props;
    return (
      <Table>
        <TableHead><TableRow>
          {columns.map(col =>
            <TableCell key={`t-header-${col}`}>{col}</TableCell>)}
        </TableRow></TableHead>
        <TableBody>
          {rows.map(row =>
            <ChildRowType columns={columns} row={row} key={row.id} />
          )}
        </TableBody>
      </Table>
    );
  }
}
