// @flow
import React, { Component } from 'react';
import TTable from './table/TTable';
import TTextRow from './table/TTextRow';

const data = [
  {id: 1, name: 'Smd Mmq', size: 10, hash: '1JFIJJJ%%J42j34jJ$j'},
  {id: 2, name: 'Herp A. Derp', size: 550, hash: '1JFIJJJ%%J42j34jJ$j'},
  {id: 3, name: 'Qier S. Riwryu', size: 60, hash: '1JFIJJJ%%J42j34jJ$j'},
  {id: 4, name: 'Niurnamx Ieurn', size: 90, hash: '1JFIJJJ%%J42j34jJ$j'},
  {id: 5, name: 'Iwohfa H. Twernas', size: 100, hash: '1JFIJJJ%%J42j34jJ$j'}
];

export default class Table extends Component {
  props: {
    entries: Array<any>,
    changePage: () => void
  };

  render() {
    const { entries } = this.props;

    return (
      <div>
        <div data-tid="container">
          <TTable entries={entries} rowType={TTextRow}/>
        </div>
      </div>
    );
  }
}
