// @flow
import React, { Component } from 'react';
import type { RowData } from '../table/types';
import Table from '../table';
import TextRow from '../table/TextRow';
import Pagination from '../pagination';

export default class extends Component {
  props: {
    rows: Array<RowData>,
    columns: Array<string>,
    changePage: () => void
  };

  render() {
    const { rows, changePage, columns } = this.props;
    return (
      <div>
        <div data-tid="container">
          <Pagination
            totalNumberOfEntries={rows.length}
            start={0}
            entriesPerPage={10}
            changePage={changePage}
          />
          <Table rows={rows} columns={columns} rowType={TextRow} />
        </div>
      </div>
    );
  }
}
