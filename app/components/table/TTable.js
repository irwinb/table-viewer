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
    data: Array,
    rowType: any
  }

  render() {
    var Row = this.props.rowType;

    return (
      <Table>
        <TableBody>
          {this.props.data.map(rowData =>
            <TableRow>
              <Row data={rowData} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}

export default TTable;