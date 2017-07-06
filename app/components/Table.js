// @flow
import React, { Component } from 'react';
import TTable from './table/TTable';
import TTextRow from './table/TTextRow';
import TPagination from './TPagination';
import { Data } from '../reducers/table';

export default class Table extends Component {
  props: {
    data: Data,
    changePage: () => void
  };

  render() {
    const { data, changePage } = this.props;
    return (
      <div>
        <div data-tid="container">
          <TPagination totalNumberOfEntries={data.rows.length} start={0} entriesPerPage={10} changePage={changePage}/>
          <TTable rows={data.rows} rowType={TTextRow}/>
        </div>
      </div>
    );
  }
}
