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
  const likedMovies = _.uniqBy(_.times(_.random(0, 20), createMovie), "id");
  const uniqueGenres = _.uniq(_.map(likedMovies, "genres").flat());
  const statistics = generateStatisticsFromMovies(likedMovies);
  const state: "LIKED" | "DISLIKED" | "UNDETERMINED" = "UNDETERMINED";
  const willLike = _.random(0, 1) ? true : false;
  return {
    id: id + 2,
    name,
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

function generateStatisticsFromMovies(movies: Movie[]) {
  return _.reduce(
    movies,
    (movieStats, movie) => {
      const { genres, director, actors } = movie;
      const next = {
        genres: _.countBy(genres),
        directors: _.countBy(director),
        actors: _.countBy(actors),
      };
      return {
        genres: _.mergeWith(movieStats.genres, next.genres),
        directors: _.mergeWith(movieStats.directors, next.directors),
        actors: _.mergeWith(movieStats.actors, next.actors),
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

const PROFILES = _.times(100, createProfile);

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
