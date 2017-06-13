// @flow
import { TableRowColumn } from 'material-ui/Table';

import React, { Component } from 'react';

const TTextRow = ({
  entry
}) => (
  <div>
    {Object
      .keys(this.props.entry)
      .map(key =>
        <TableRowColumn> 
          {this.props.entry[key]}
        </TableRowColumn>
      )}
  </div>  
)

export default TTextRow;