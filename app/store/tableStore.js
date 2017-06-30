// @flow
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./tableStore.prod'); // eslint-disable-line global-require
} else {
  module.exports = require('./tableStore.dev'); // eslint-disable-line global-require
}