import _ from "lodash";

export function upsert<T>(arr: T[], index: number, next: T) {
  const _arr = _.cloneDeep(arr);
  const match = _.findIndex(_arr, index);
  if (match) {
    return _arr.splice(index, 1, next);
  }
  return [..._arr, next];
}
