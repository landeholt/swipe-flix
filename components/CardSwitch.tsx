import React from "react";
import { Movie } from "../models/profile";
import MovieCard from "./MovieCard";
import ProfileCard from "./ProfileCard";

interface ProfileCard {
  uniqueGenres: string[];
  likedMovies: Movie[];
  image: {
    src: string;
  };
  name: string;
  type: "PROFILE";
}

interface AdCard {
  type: "AD";
  source: {
    type: "image" | "movie";
    uri: string;
  };
  title: string;
  description: string;
}

interface MovieCard extends Movie {
  type: "MOVIE";
}

interface Props {
  card: ProfileCard | MovieCard | AdCard;
}
export default function CardSwitch({ card }: Props) {
  switch (card.type) {
    case "PROFILE":
      return (
        <ProfileCard
          card={{
            image: { src: card.image.src },
            title: card.name,
            genres: card.uniqueGenres,
            movies: card.likedMovies,
          }}
        />
      );
    case "MOVIE":
      return (
        <MovieCard
          card={{
            image: { src: card.posterUrl },
            genres: card.genres,
          }}
        />
      );
    default:
      return <></>;
  }
}
