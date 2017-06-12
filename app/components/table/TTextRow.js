// @flow
import { TableRowColumn } from 'material-ui/Table';

import React, { Component } from 'react';

class TTextRow extends Component {
  props: {
    entry: any
  }

  render() {
    return (
      <div>
        {Object
          .keys(this.props.entry)
          .map(key =>
            <TableRowColumn> 
              {this.props.entry[key]}
            </TableRowColumn>
          )}
      </div>);
  }
}
/*
const TTextRow = ({data}) => (
  <div>
    {Object
      .keys(data)
      .map(key => {
        <TableRowColumn> 
          <TextColumn data={key} />
        </TableRowColumn>
      })}
  </div>  
)
*/
export default TTextRow;