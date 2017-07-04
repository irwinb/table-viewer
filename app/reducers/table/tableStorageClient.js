// @flow
import {
  createTableService,
  TableQuery
} from 'azure-storage';
import Bluebird from 'bluebird';
import Conf from 'conf';

const connString = 'nope';
const config = new Conf();

function TableStorageClientFactory(connectionString: string, entity: string) {
  const proto = {
    maxRowsPerRequest: config.get('azure.maxRowsPerRequest'),
    entity,
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

function createAsyncTableService() {
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