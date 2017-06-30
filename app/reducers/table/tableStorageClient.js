import {
  createTableService,
  TableQuery
} from 'azure-storage';
import Bluebird from 'bluebird';

const connString = 'DefaultEndpointsProtocol=https;AccountName=gggspotify;AccountKey=sWOVzABIyZGU7hmJFa0AMTAlahB3aVvObrjZ5wKswrWwJ5IbeXKgEQv4eUy7SdAJS/fD7aa/JkHn2H20EUmdpw==;EndpointSuffix=core.windows.net';

const proto = {
  table: createAsyncTableService(),

  getRows() {
    const getAllQuery = new TableQuery().select();

    return this.table
      .queryEntitiesAsync('members', getAllQuery, null)
      .then(result => {
        return result.response.body.value;
      });
  }
};

function createTableStorageClient() {
  return Object.create(proto);
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

export default createTableStorageClient;