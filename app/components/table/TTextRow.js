// @flow
import { TableRowColumn } from 'material-ui/Table';

import React, { Component } from 'react';

class TTextRow extends Component {
  props: {
    data: any
  }

  render() {
    return (
      <div>
        {Object
          .keys(this.props.data)
          .map(key =>
            <TableRowColumn> 
              {this.props.data[key]}
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