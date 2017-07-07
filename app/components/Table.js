// @flow
import React, { Component } from 'react';
import TTable from './table/TTable';
import TTextRow from './table/TTextRow';
import TPagination from './TPagination';

export default class Table extends Component {
  props: {
    rows: Array,
    columns: Array,
    changePage: () => void
  };

  render() {
    const { rows, changePage, columns } = this.props;
    return (
      <div>
        <div data-tid="container">
          <TPagination totalNumberOfEntries={rows.length} start={0} entriesPerPage={10} changePage={changePage} />
          <TTable rows={rows} columns={columns} rowType={TTextRow} />
        </div>
      </div>
    );
  }
}
