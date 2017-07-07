// @flow
import React, { Component } from 'react';
import Table, {
  TableBody, 
  TableHead,
  TableCell
} from 'material-ui/Table';

export default class TTable extends Component {
  props: {
    rows: Array,
    columns: Array<string>,
    rowType: any
  }

  render() {
    const Row = this.props.rowType;
    return (
      <Table>
        <TableHead>
          {this.props.columns.map(col =>
            <TableCell key={`t-col-${col}`}>{col}</TableCell>)}
        </TableHead>
        <TableBody>
          {this.props.rows.map(row =>
            <Row row={row} key={row.id} />
          )}
        </TableBody>
      </Table>
    );
  }
}