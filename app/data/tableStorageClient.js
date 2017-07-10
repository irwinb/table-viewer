// @flow
import {
  createTableService,
  TableQuery
} from 'azure-storage';
import Bluebird from 'bluebird';
import Conf from '../conf';

function TableStorageClientFactory(connectionString: string) {
  const proto = {
    maxRowsPerRequest: Conf.get('data.maxRowsPerRequest'),
    table: createAsyncTableService(connectionString),

    getRows(count: number, continuationToken: string) {
      if (count > this.maxRowsPerRequest) {
        throw new Error(`number of rows must be (0,${this.maxRowsPerRequest}]`);
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

export default TableStorageClientFactory;
