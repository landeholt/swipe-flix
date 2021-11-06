import _ from "lodash";
import {
  Box,
  ScrollView,
  VStack,
  Text,
  Image,
  HStack,
  IconButton,
  Input,
} from "native-base";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getAllMovies } from "../models/movie";
import { Movie } from "../models/profile";
import { Ionicons } from "@expo/vector-icons";

interface IMovieCardProps {
  movie: {
    posterImage: { url: string };
    name: string;
  };
}

function MovieCard({ movie }: IMovieCardProps) {
  return (
    <VStack px={2} alignItems="center">
      <Image
        w="60px"
        h="85px"
        bg="warmGray.200"
        rounded="lg"
        source={{ uri: movie.posterImage.url }}
        alt={`Movie poster of ${movie.name}`}
        fallbackSource={{
          uri: "http://image.tmdb.org/t/p/w500//63kGofUkt1Mx0SIL4XI4Z5AoSgt.jpg",
        }}
      />
      <Text
        isTruncated
        noOfLines={2}
        pt={1}
        textAlign="center"
        fontSize="xs"
        fontWeight="semibold"
        color="warmGray.600"
        w="55px"
      >
        {movie.name}
      </Text>
    </VStack>
  );
}

interface Props {
  genres: string[];
  onClose: () => void;
}
export default function MovieSelection(props: Props) {
  const movies = useMemo(() => {
    return _.chain(props.genres)
      .reduce((acc, it) => {
        return [...acc, ...getAllMovies(it)];
      }, [] as Movie[])
      .uniqBy("id")
      .value();
  }, [props.genres]);

  const [filteredMovies, setfilteredMovies] = useState<Movie[]>(movies);

  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    setfilteredMovies(
      movies.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query]);

  return (
    <VStack>
      <Text bold fontSize="md" color="warmGray.600" pb={3}>
        Movies in genres you both like
      </Text>
      <ScrollView horizontal>
        {filteredMovies.slice(0, 10).map((movie, key) => (
          <MovieCard
            key={key}
            movie={{
              name: movie.title,
              posterImage: {
                url: movie.posterUrl,
              },
            }}
          />
        ))}
      </ScrollView>
      <HStack pt={4} w="full">
        <IconButton
          onPress={props.onClose}
          _icon={{
            as: Ionicons,
            name: "close",
            size: "sm",
            color: "warmGray.600",
          }}
          p={2}
          _focus={{
            bg: "warmGray.300",
          }}
          _pressed={{
            bg: "warmGray.300",
          }}
          size="sm"
          variant="ghost"
          rounded="full"
        />
        <Input
          flexGrow={1}
          _focus={{
            borderColor: "warmGray.300",
          }}
          onChangeText={setQuery}
          color="black"
          variant="filled"
          h="36px"
          placeholder="Search for a movie"
          px={2}
          fontSize="lg"
          placeholderTextColor="black"
          selectionColor="red.300"
          bg="warmGray.100"
          borderColor="warmGray.200"
          borderWidth={1}
        />
      </HStack>
    </VStack>
  );
}
