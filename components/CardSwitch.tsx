import React from "react";
import { Movie } from "../models/profile";
import ProfileCard from "./ProfileCard";

interface ProfileCard {
  genres: string[];
  movies: Movie[];
  source: {
    type: "image";
    uri: string;
  };
  title: string;
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

interface MovieCard {
  type: "MOVIE";
  source: {
    type: "image" | "movie";
    uri: string;
  };
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
            image: { src: card.source.uri },
            title: card.title,
            genres: card.genres,
            movies: card.movies,
          }}
        />
      );
    default:
      return <></>;
  }
}
