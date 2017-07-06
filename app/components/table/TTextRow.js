// @flow
import { 
  TableRowColumn, 
  TableRow 
} from 'material-ui/Table';

import React, { Component } from 'react';

const TTextRow = ({
  row
}) => (
  <TableRow>
    {Object
      .keys(row)
      .map(key =>
        <TableRowColumn key={row.id}> 
          {row[key]}
        </TableRowColumn>)
    }
  </TableRow>
);

export default TTextRow;