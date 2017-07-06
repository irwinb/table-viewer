// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import { 
  Table,
  TableBody,
  TableRow
} from 'material-ui/Table';

class TTable extends Component {
  props: {
    rows: Array,
    rowType: any
  }

  render() {
    var Row = this.props.rowType;

    return (
      <Table>
        <TableBody>
          {this.props.rows.map(row =>
            <Row row={row} key={row.id} />
          )}
        </TableBody>
      </Table>
    );
  }
}

export default TTable;