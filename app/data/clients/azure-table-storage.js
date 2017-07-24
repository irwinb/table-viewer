// @flow
import {
  createTableService,
  TableQuery
} from 'azure-storage';
import Bluebird from 'bluebird';
import config from '../../config';

type ContinuationToken = {
  nextPartitionKey: string,
  nextRowKey: string,
  targetLocation: number
};

type Entity = {
  PartitionKey: string,
  RowKey: string
};

type Row = {
  id: string
};

function TableStorageClientFactory(connectionString: string) {
  const proto = {
    maxRowsPerRequest: config.get('data.maxRowsPerRequest'),
    table: createAsyncTableService(connectionString),

    getRows(count: number, continuationToken: ?ContinuationToken) {
      if (count > this.maxRowsPerRequest) {
        throw new Error(`number of rows must be (0,${this.maxRowsPerRequest}]`);
      }

      const getAllQuery = new TableQuery()
      .select()
      .top(count);

      return this.table
        .queryEntitiesAsync('users', getAllQuery, continuationToken)
        .then(result => ({
            rows: result.response.body.value.map(imputateRow),
            continuationToken: result.result.continuationToken
        }));
    }
  };

  return proto;
}

const imputateRow = (row: Entity): Row => ({...row,
  id: `${row.PartitionKey}:${row.RowKey}`
});

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
