// @flow
import React, { Component } from 'react';
import type { RowData,  PageType } from '../table/types';
import type { ChangePage } from '../pagination/types';
import Table from '../table/Table';
import TextRow from '../table/TextRow';
import Pagination from '../pagination';

export default class extends Component {
  props: {
    rows: Array<RowData>,
    columns: Array<string>,
    changePage: ChangePage,
    page: PageType
  };

  render() {
    const { rows, changePage, columns, page } = this.props;
    return (
      <div>
        <div data-tid="container">
          <Table rows={rows} columns={columns} rowType={TextRow} />
          <Pagination
            totalNumberOfElements={page.totalNumberOfRows}
            start={page.start}
            elementsPerPage={page.count}
            changePage={changePage}
          />
        </div>
      </div>
    );
  }
}
