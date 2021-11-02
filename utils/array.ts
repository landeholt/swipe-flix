import _ from "lodash";

export function upsert<T>(arr: T[], index: number, next: T) {
  const _arr = _.cloneDeep(arr);
  const match = _.findIndex(_arr, index);
  if (match) {
    return _arr.splice(index, 1, next);
  }
  return [..._arr, next];
}

export function atRandom<T>(arr: T[]): T {
  const len = arr.length - 1;
  const idx = _.random(0, len);
  return arr[idx];
}
