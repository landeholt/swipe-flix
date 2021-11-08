import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { Card as CardStackCard } from "react-native-card-stack-swiper";
import { LinearGradient } from "expo-linear-gradient";
import { Movie } from "../models/profile";
import {
  Badge,
  Box,
  HStack,
  IconButton,
  Spacer,
  Text,
  VStack,
} from "native-base";
import GradientBadge from "./GradientBadge";
import SmallMovieCard from "./SmallMovieCard";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Ribbon from "./Ribbon";
import _ from "lodash";
import { useNavigation } from "@react-navigation/native";
import { MainRoutes } from "../types/main";

interface Props {
  card: {
    id: number;
    age: number;
    image: {
      src: string;
    };
    title: string;
    genres: string[];
    movies: Movie[];
  };
}

const { width, height } = Dimensions.get("window");

export default function ProfileCard({ card }: Props) {
  const navigator = useNavigation();
  const [blur, setBlur] = useState<number>(20);

  function unblur() {
    setBlur(0);
  }
  function reblur() {
    setBlur(20);
  }

  function openProfile() {
    /* @ts-ignore */
    navigator.navigate(MainRoutes.MatchProfile, { id: card.id });
  }

  return (
    <CardStackCard style={styles.card}>
      <Pressable onLongPress={unblur} onPress={openProfile} onPressOut={reblur}>
        <ImageBackground
          source={{ uri: card.image.src }}
          style={styles.cardImage}
          blurRadius={blur}
        >
          <Ribbon type="PROFILE">Profile</Ribbon>
          <LinearGradient
            style={styles.details}
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.6 }}
          >
            <VStack space={2} pb="60px">
              <Text bold fontSize="4xl">
                {card.title}, <Text fontSize="3xl">{card.age}</Text>
              </Text>
              <HStack space={2}>
                {card.genres.slice(0, 3).map((genre, key) => (
                  <GradientBadge>{genre}</GradientBadge>
                ))}
              </HStack>
              <HStack space={1} alignItems="center">
                {card.movies.slice(0, 4).map((movie, key) => (
                  <SmallMovieCard key={key} source={{ uri: movie.posterUrl }} />
                ))}
                <Spacer />
                <IconButton
                  _icon={{
                    as: MaterialCommunityIcons,
                    name: "information",
                    color: "white.50",
                  }}
                  _focus={{
                    bg: "white.50",
                  }}
                  _pressed={{
                    bg: "white.50",
                  }}
                  rounded="full"
                />
              </HStack>
            </VStack>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    </CardStackCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  content: {
    flex: 1,
    flexGrow: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    minWidth: "100%",
    height: height * 0.8,
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    borderRadius: 7,
    backgroundColor: "#f2f2f2",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  cardImage: {
    display: "flex",
    flexGrow: 1,
    width: width * 0.94,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-end",
    overflow: "hidden",
    borderRadius: 7,
  },
  details: {
    paddingVertical: 30,
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
