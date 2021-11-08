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
  Pressable,
  Modal,
  useDisclose,
  Flex,
  Spacer,
  Button,
  Center,
} from "native-base";
import * as Linking from "expo-linking";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getAllMoviesBy } from "../models/movie";
import { Movie } from "../models/profile";
import { Ionicons } from "@expo/vector-icons";
import { getAllProviders } from "../models/providers";
import { Dimensions } from "react-native";

interface IMovieCardProps {
  onOpen: () => void;
  movie: {
    posterImage: { url: string };
    name: string;
  };
}

function MovieCard({ movie, onOpen }: IMovieCardProps) {
  return (
    <Pressable onPress={onOpen}>
      <VStack px={2} alignItems="center">
        <Image
          w="60px"
          h="85px"
          bg="coolGray.200"
          rounded="lg"
          source={{ uri: movie.posterImage.url }}
          alt={`Movie poster of ${movie.name}`}
          fallbackElement={
            <Center h="90px" w="60px" bg="coolGray.200" rounded="lg" shadow="2">
              <Text color="warmGray.600" fontSize="5xl">
                ?
              </Text>
            </Center>
          }
        />
        <Text
          isTruncated
          bold
          noOfLines={2}
          pt={1}
          textAlign="center"
          fontSize="xs"
          fontWeight="semibold"
          color="coolGray.100"
          w="55px"
        >
          {movie.name}
        </Text>
      </VStack>
    </Pressable>
  );
}

interface Props {
  genres: string[];
  onClose: () => void;
}

const { height } = Dimensions.get("window");

export default function MovieSelection(props: Props) {
  const { isOpen, onClose, onOpen } = useDisclose();

  const providers = useMemo(() => getAllProviders(), []);
  const movies = useMemo(() => {
    return _.chain(props.genres)
      .reduce((acc, it) => {
        return [...acc, ...getAllMoviesBy(it)];
      }, [] as Movie[])
      .uniqBy("id")
      .value();
  }, [props.genres]);

  const [filteredMovies, setfilteredMovies] = useState<Movie[]>(movies);

  const [query, setQuery] = useState<string>("");

  function prepareModal(id: number) {
    onOpen();
  }

  useEffect(() => {
    setfilteredMovies(
      movies.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" px={1}>
        <Modal.Content bg="coolGray.200">
          <Modal.Header _text={{ color: "coolGray.600" }} borderBottomWidth={0}>
            Watch it together
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <VStack h="full" space={2}>
              {providers.map((provider, key) => (
                <HStack
                  key={key}
                  borderBottomWidth={key < providers.length - 1 ? 1 : 0}
                  py={2}
                  borderBottomColor="coolGray.300"
                >
                  <VStack space={1}>
                    <Text color="coolGray.600">{provider.name}</Text>
                    <Text color="coolGray.400">
                      {provider.type === "PPV"
                        ? "From 39,00 kr"
                        : provider.type}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Button
                    onPress={() =>
                      Linking.openURL("https://www.netflix.com/watch/80186925")
                    }
                    variant="outline"
                    _text={{ fontWeight: "semibold" }}
                    colorScheme="red"
                  >
                    Watch
                  </Button>
                </HStack>
              ))}
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <VStack>
        <Text bold fontSize="md" color="coolGray.100" pb={3}>
          Movies in genres you both like
        </Text>
        <ScrollView horizontal>
          {filteredMovies.slice(0, 10).map((movie, key) => (
            <MovieCard
              key={key}
              onOpen={() => prepareModal(movie.id)}
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
            mr={1}
            onPress={props.onClose}
            _icon={{
              as: Ionicons,
              name: "close",
              size: "sm",
              color: "coolGray.500",
            }}
            p={2}
            _focus={{
              bg: "coolGray.600",
            }}
            _pressed={{
              bg: "coolGray.600",
            }}
            size="sm"
            variant="ghost"
            rounded="full"
          />
          <Input
            flexGrow={1}
            _focus={{
              borderColor: "coolGray.300",
            }}
            onChangeText={setQuery}
            color="coolGray.50"
            variant="filled"
            h="36px"
            placeholder="Search for a movie"
            px={2}
            fontSize="lg"
            placeholderTextColor="coolGray.50"
            selectionColor="red.400"
            bg="coolGray.500"
            borderColor="coolGray.400"
            borderWidth={1}
          />
        </HStack>
      </VStack>
    </>
  );
}
