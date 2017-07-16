/**
 * Script to popupate the local db with test data
 */
const azure = require('azure-storage');
const asyncAzure = require('./azure-async');
const Bluebird = require('bluebird');

const entGen = azure.TableUtilities.entityGenerator;
const CONN_STRING = 'DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;';
const TABLE_USERS = 'users';

const table = asyncAzure.createAsyncTableService(CONN_STRING);

function populateUsers() {
  const testUsers = require('../test-data/users.json');

  const entities = testUsers.map((user) => ({
    PartitionKey: entGen.String('user'),
    RowKey: entGen.String(user.email),
    cell: entGen.String(user.cell),
    dob: entGen.DateTime(new Date(user.dob)),
    gender: entGen.String(user.gender),
    location: entGen.String(JSON.stringify(user.location)),
    login: entGen.String(JSON.stringify(user.login)),
    name: entGen.String(JSON.stringify(user.name)),
    nat: entGen.String(user.nat),
    phone: entGen.String(user.phone),
    picture: entGen.String(JSON.stringify(user.picture))
  }));

  table.createTableIfNotExistsAsync(TABLE_USERS)
    .then(() => {
      const promises = [];

      while (entities.length > 0) {
        const batch = new azure.TableBatch();

        entities.splice(0, 99)
          .forEach(entity => batch.insertOrReplaceEntity(entity));

        promises.push(table.executeBatchAsync(TABLE_USERS, batch));
      }

      return Promise.all(promises);
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(`error: ${err}`);
    });
}

populateUsers();
