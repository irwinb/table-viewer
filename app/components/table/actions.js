// @flow
import TableStorageClientFactory from '../../data/tableStorageClient';

const connString = 'DefaultEndpointsProtocol=https;AccountName=gggspotify;AccountKey=sWOVzABIyZGU7hmJFa0AMTAlahB3aVvObrjZ5wKswrWwJ5IbeXKgEQv4eUy7SdAJS/fD7aa/JkHn2H20EUmdpw==;EndpointSuffix=core.windows.net';


type ActionType = {
  type: string
};

export const CHANGE_TABLE = 'CHANGE_TABLE';
export function changeTable(name: string): ActionType {
  return {
    type: CHANGE_TABLE,
    name
  };
}

export const UPDATE_TABLE = 'UPDATE_TABLE';
export function updateTable(rowsPerPage: number): ActionType {
  return {
    type: UPDATE_TABLE,
    rowsPerPage
  };
}

export const UPDATE_PAGE = 'UPDATE_PAGE';
export function updatePage(start: number, count: number): ActionType {
  return {
    type: UPDATE_PAGE,
    start,
    count
  };
}

export const REQUEST_DATA = 'REQUEST_DATA';
export function requestData(): ActionType {
  return {
    type: REQUEST_DATA
  };
}

export const RECEIVE_DATA = 'RECEIVE_DATA';
export function receiveData(data: any): ActionType {
  return {
    type: RECEIVE_DATA,
    data
  };
}

export const RECEIVE_DATA_FAILURE = 'RECEIVE_DATA_FAILURE';
export function receiveDataFailure(error: Error): ActionType {
  return {
    type: RECEIVE_DATA_FAILURE,
    error
  };
}
