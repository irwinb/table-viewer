const azure = require('azure-storage');
const Bluebird = require('bluebird');

exports.createAsyncTableService = function(connString) {
  return Bluebird.promisifyAll(azure.createTableService(connString), {
    promisifier: (func) => function promisifier(...args) {
      return new Promise((resolve, reject) => {
        try {
          func.call(this, ...args, (err, result, response) => {
            if (err) {
              reject(err);
            } else {
              resolve({ result, response });
            }
          });
        } catch (e) {
          reject(e);
        }
      });
    }
  });
}
