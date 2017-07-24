// @flow
import {
  createTableService,
  TableQuery
} from 'azure-storage';
import Bluebird from 'bluebird';
import azureClientFactory from './clients/azure-table-storage';

export default azureClientFactory;
