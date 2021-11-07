import _ from "lodash";
import { movies } from "../providers/mockup/movies.json";
import { atRandom } from "../utils/array";
import { Movie } from "./profile";

export function getAllMoviesBy(genre: string) {
  return movies.filter((p) => p.genres.includes(genre));
}

export function getRandomMovies(amount: number = 20) {
  return _.times(amount, () => atRandom(movies));
}
