// @flow
import {
  createTableService,
  TableQuery
} from 'azure-storage';
import Bluebird from 'bluebird';
import Conf from 'conf';

// const config = new Conf();
// TODO use a config that works
const configDictionary = {
  'azure.maxRowsPerRequest': 1000
};

const config = {
  get(key) {
    return configDictionary[key];
  }
};

function TableStorageClientFactory(connectionString: string) {
  const proto = {
    maxRowsPerRequest: config.get('azure.maxRowsPerRequest'),
    table: createAsyncTableService(connectionString),

    getRows(count: number, continuationToken: string) {
      if (count > maxRowsPerRequest) {
        throw new Error(`number of rows must be (0,${maxRowsPerRequest}]`);
      }

      const getAllQuery = new TableQuery()
      .select()
      .top(count);

      return this.table
        .queryEntitiesAsync('members', getAllQuery, continuationToken)
        .then(result => {
          console.log(JSON.stringify(result));
          return result.response.body.value;
        });
    }
  };

  return proto;
}

function createAsyncTableService(connString) {
  return Bluebird.promisifyAll(createTableService(connString), {
    promisifier: (func) => function (...args) {
      return new Promise((resolve, reject) => {
        try {
          func.call(this, ...args, (err, result, response) => {
            err && reject(err);
            resolve({result, response});
          });
        } catch (e) {
          reject(e);
        }
      });
    }
  });
};

export default TableStorageClientFactory;