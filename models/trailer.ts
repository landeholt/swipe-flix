import _ from "lodash";
import { items } from "../providers/mockup/filmstaden.json";
import { Item } from "../types/filmstaden";
import { atRandom } from "../utils/array";

export function getAllTrailers(amount: number = 10) {
  const _items = items as unknown as Item[];
  return _.times(amount, () => atRandom(_items));
}
