// @flow
import { 
  TableRowColumn, 
  TableRow 
} from 'material-ui/Table';

import React, { Component } from 'react';

const TTextRow = ({
  entry
}) => (
  <TableRow>
    {Object
      .keys(entry)
      .map(key =>
        <TableRowColumn key={entry.id}> 
          {entry[key]}
        </TableRowColumn>)
    }
  </TableRow>
);

export default TTextRow;