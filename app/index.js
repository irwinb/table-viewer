import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const initialState = {
  table: {
    columns: ['id', 'name', 'size', 'hash'],
    name: 'hi',
    rowsPerPage: 10
  }
};
initialState.table.rows = Array
  .from(Array(100))
  .map((val, index) => {
    return {
      id: `${index}`,
      name: 'Smd Mmq',
      size: 10,
      hash: '1JFIJJJ%%J42j34jJ$j'
    };
  });

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
