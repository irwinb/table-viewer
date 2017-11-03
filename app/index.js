import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import { changePage } from './actions/tableExplorer';
import config from './config';

const initialState = {
  tableExplorer: {
    table: {
    },
    pagination: {
      countPerPage: config.get('defaultCountPerPage'),
      start: 0
    }
  }
};

const store = configureStore(initialState);
store.dispatch(changePage(0));

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
