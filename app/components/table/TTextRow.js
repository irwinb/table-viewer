// @flow
import React from 'react';
import { 
  TableCell, 
  TableRow 
} from 'material-ui/Table';

const TTextRow = ({
  row
}) => (
  <TableRow>
    {Object
      .keys(row)
      .map(key =>
        <TableCell key={row.id}> 
          {row[key]}
        </TableCell>)
    }
  </TableRow>
);

export default TTextRow;