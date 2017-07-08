// @flow
import React, { Component } from 'react';
import Table, {
  TableBody, 
  TableHead,
  TableCell,
  TableRow 
} from 'material-ui/Table';

export default class TTable extends Component {
  props: {
    rows: Array,
    columns: Array<string>,
    rowType: any
  }

  render() {
    const Row = this.props.rowType;
    const { rows, columns } = this.props;
    return (
      <Table>
        <TableHead><TableRow>
          {columns.map(col =>
            <TableCell key={`t-header-${col}`}>{col}</TableCell>)}
        </TableRow></TableHead>
        <TableBody>
          {rows.map(row =>
            <Row columns={columns} row={row} key={row.id} />
          )}
        </TableBody>
      </Table>
    );
  }
}