// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import TTable from './table/TTable';
import TTextRow from './table/TTextRow';

const data = [
  {id: 1, name: 'Smd Mmq', size: 10, hash: '1JFIJJJ%%J42j34jJ$j'},
  {id: 2, name: 'Herp A. Derp', size: 550, hash: '1JFIJJJ%%J42j34jJ$j'},
  {id: 3, name: 'Qier S. Riwryu', size: 60, hash: '1JFIJJJ%%J42j34jJ$j'},
  {id: 4, name: 'Niurnamx Ieurn', size: 90, hash: '1JFIJJJ%%J42j34jJ$j'},
  {id: 5, name: 'Iwohfa H. Twernas', size: 100, hash: '1JFIJJJ%%J42j34jJ$j'}
];

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <TTable entries={data} rowType={TTextRow}/>
        </div>
      </div>
    );
  }
}