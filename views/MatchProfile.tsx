import {
  Box,
  Image,
  ScrollView,
  VStack,
  Text,
  Icon,
  HStack,
  Badge,
  Flex,
  IconButton,
} from "native-base";
import React, { useEffect, useMemo } from "react";
import { Dimensions, ImageBackground } from "react-native";
import { useSetRecoilState } from "recoil";
import { getProfile, Movie } from "../models/profile";
import { navigationStore } from "../providers/state";
import { SimpleLineIcons } from "@expo/vector-icons";
import _ from "lodash";
import { atRandom } from "../utils/array";
import { Ionicons } from "@expo/vector-icons";
import MoviePagination from "../components/MoviePagination";
import CompanionChart from "../components/CompanionChart";
import { useNavigation } from "@react-navigation/native";

interface Props {
  route: { params: { id: number } };
}

const { width, height } = Dimensions.get("window");

export default function MatchProfile(props: Props) {
  const navigator = useNavigation();
  const id = props.route.params.id;
  const profile = useMemo(() => getProfile(id), [id]);

  const setStore = useSetRecoilState(navigationStore);

  useEffect(() => {
    setStore((s) => ({ ...s, showBottomTab: false }));
    return () => {
      setStore((s) => ({ ...s, showBottomTab: true }));
    };
  }, []);

  const popularGenres = useMemo(
    () =>
      _.chain(profile.statistics.genres)
        .map((v, k) => ({
          name: k,
          value: v,
        }))
        .sortBy("value")
        .reverse()
        .value(),
    [profile.statistics.genres]
  );

  const popularMovies = useMemo(
    () =>
      _.uniqBy(
        _.reduce(
          popularGenres,
          (acc, it) => {
            const moviesFromGenre = profile.likedMovies.filter((p) =>
              p.genres.includes(it.name)
            );
            return [
              ...acc,
              atRandom(moviesFromGenre),
              atRandom(moviesFromGenre),
            ];
          },
          [] as Movie[]
        ),
        "id"
      ),
    []
  );

  return (
    <ScrollView bg="coolGray.800">
      <VStack safeAreaBottom>
        <Image
          alt={`Image of ${profile.name}`}
          source={{ uri: profile.image.src }}
          w="full"
          h={height * 0.65}
        />
        <VStack px={4} pt={2} space={3}>
          <IconButton
            top={-20}
            left={25}
            position="absolute"
            _pressed={{
              bg: "red.600",
            }}
            rounded="full"
            bg="red.500"
            onPress={navigator.goBack}
            icon={
              <Icon
                as={Ionicons}
                name="arrow-back-outline"
                color="white.50"
                rounded="full"
                size="6"
              />
            }
          />
          <Text fontWeight="semibold" fontSize="5xl" color="coolGray.50">
            {profile.name}{" "}
            <Text fontSize="3xl" color="coolGray.50">
              {profile.age}
            </Text>
          </Text>
          <HStack alignItems="center" space={1.5}>
            <Icon
              as={SimpleLineIcons}
              name="location-pin"
              color="coolGray.300"
              size="4"
            />
            <Text color="coolGray.300" fontSize="lg">
              {profile.location} miles away
            </Text>
          </HStack>
          <Flex wrap="wrap" direction="row">
            {popularGenres.slice(0, 7).map((genre, key) => {
              const random = _.random(0, 10);
              return (
                <Badge
                  mr={1}
                  mb={2}
                  key={key}
                  rounded="xl"
                  variant={random > 3 ? "solid" : "outline"}
                  colorScheme={random > 3 ? "red" : "coolGray"}
                >
                  {genre.name}
                </Badge>
              );
            })}
          </Flex>
          <CompanionChart data={popularGenres.slice(0, 4)} />
          <Box>
            <Text
              fontSize="3xl"
              fontWeight="semibold"
              color="coolGray.200"
              pb={3}
            >
              Favorite movies
            </Text>
            <MoviePagination data={popularMovies} />
          </Box>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
