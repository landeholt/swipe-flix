import _ from "lodash";
import { names } from "../providers/mockup/names.json";
import { movies } from "../providers/mockup/movies.json";
import { atRandom } from "../utils/array";

export type Movie = {
  id: number;
  title: string;
  year: string;
  runtime: string;
  genres: string[];
  director: string;
  actors: string;
  plot: string;
  posterUrl: string;
};

export function createProfile(id: number) {
  const index = _.random(0, names.length - 1);
  const name = names[index];
  const imageSrc = `https://i.pravatar.cc/500?u=${name}`;
  const likedMovies = _.uniqBy(_.times(35, createMovie), "id");
  const uniqueGenres = _.uniq(_.map(likedMovies, "genres").flat());
  const statistics = generateStatisticsFromMovies(likedMovies);
  const state: "LIKED" | "DISLIKED" | "UNDETERMINED" = "UNDETERMINED";
  const willLike = _.random(0, 1) ? true : false;
  const age = _.random(18, 36);
  const location = _.random(1, 40);
  return {
    id: id + 2,
    name,
    age,
    location,
    willLike,
    image: {
      src: imageSrc,
    },
    likedMovies,
    uniqueGenres,
    statistics,
    state,
  };
}

function adder(a: number | undefined, b: number | undefined) {
  const _a = _.isUndefined(a) ? 0 : a;
  const _b = _.isUndefined(b) ? 0 : b;
  return _a + _b;
}

function generateStatisticsFromMovies(movies: Movie[]) {
  return _.reduce(
    movies,
    (movieStats, movie) => {
      const { genres, director, actors } = movie;
      const next = {
        genres: _.countBy(genres),
        directors: _.countBy(director.split(", ")),
        actors: _.countBy(actors.split(", ")),
      };
      return {
        genres: _.mergeWith(movieStats.genres, next.genres, adder),
        directors: _.mergeWith(movieStats.directors, next.directors, adder),
        actors: _.mergeWith(movieStats.actors, next.actors, adder),
      };
    },
    { genres: {}, directors: {}, actors: {} }
  );
}

function createMovie() {
  const index = _.random(0, movies.length - 1);
  const movie = movies[index];
  return movie;
}

const PROFILES = _.times(7, createProfile);

export function generateQueue() {
  return PROFILES;
}

export function getProfile(id: number) {
  return PROFILES.find((p) => p.id === id) || PROFILES[0];
}

export function getMovieFromGenres(id: number | undefined) {
  if (id) {
    const profile = getProfile(id);
    const genre = atRandom(profile.uniqueGenres);
    const moviesWithGenre = profile.likedMovies.filter((p) =>
      p.genres.includes(genre)
    );
    return atRandom(moviesWithGenre);
  }
  return null;
}
