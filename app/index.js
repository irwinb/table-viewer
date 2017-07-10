import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const initialState = {
  table: {
    rows: [
      { id: 1, name: 'Smd Mmq', size: 10, hash: '1JFIJJJ%%J42j34jJ$j' },
      { id: 2, name: 'Herp A. Derp', size: 550, hash: '1JFIJJJ%%J42j34jJ$j' },
      { id: 3, name: 'Qier S. Riwryu', size: 60, hash: '1JFIJJJ%%J42j34jJ$j' },
      { id: 4, name: 'Niurnamx Ieurn', size: 90, hash: '1JFIJJJ%%J42j34jJ$j' },
      { id: 5, name: 'Iwohfa H. Twernas', size: 100, hash: '1JFIJJJ%%J42j34jJ$j' }
    ],
    columns: ['id', 'name', 'size', 'hash'],
    name: 'hi',
    rowsPerPage: 10
  }
};
const store = configureStore(initialState);

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
