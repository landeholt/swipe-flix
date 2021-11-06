import { movies } from "../providers/mockup/movies.json";

export function getAllMovies(genre: string) {
  return movies.filter((p) => p.genres.includes(genre));
}
