import _ from "lodash";

export function upsert<T>(arr: T[], index: number, next: T) {
  const match = _.findIndex(arr, index);
  if (match) {
    return arr.splice(index, 1, next);
  }
  return [...arr, next];
}
