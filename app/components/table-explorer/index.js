// @flow
import React, { Component } from 'react';
import type { RowData } from '../table/types';
import type { ChangePage } from '../pagination/types';
import Table from '../table/Table';
import TextRow from '../table/TextRow';
import Pagination from '../pagination';

export default class extends Component {
  props: {
    rows: Array<RowData>,
    columns: Array<string>,
    changePage: ChangePage,
    totalNumberOfRows: number
  };

  render() {
    const { rows, changePage, columns, totalNumberOfRows } = this.props;
    return (
      <div>
        <div data-tid="container">
          <Table rows={rows} columns={columns} rowType={TextRow} />
          <Pagination
            totalNumberOfElements={totalNumberOfRows}
            start={0}
            elementsPerPage={10}
            changePage={changePage}
          />
        </div>
      </div>
    );
  }
}
