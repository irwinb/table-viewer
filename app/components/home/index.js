// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';

export default class extends Component {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <Link to="/table">to Table</Link>
        </div>
      </div>
    );
  }
}
