// @flow
type ActionType = {
  type: string
};

export const UPDATE_COLUMNS = 'UPDATE_COLUMNS';
export function updateColumns(columns: Array<string>): ActionType {
  return {
    type: UPDATE_COLUMNS,
    columns
  };
}
