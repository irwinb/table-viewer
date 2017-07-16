import { connect } from 'react-redux';
import type { RowData } from '../components/Table';
import React from 'react';
import Pagination from './Pagination';
import TextRow from '../components/TextRow';
import Table from '../components/Table';
import getCurrentPageRows from '../selectors/table';

const TablePage = (props: {
  rows: Array<RowData>,
  columns: Array<string>
}) => (
  <div>
    <div data-tid="container">
      <Table rows={props.rows} columns={props.columns} rowType={TextRow} />
      <Pagination />
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    rows: getCurrentPageRows(state),
    columns: state.tableExplorer.table.columns,
  };
}

export default connect(mapStateToProps)(TablePage);
