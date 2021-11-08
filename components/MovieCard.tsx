import React from "react";
import { ImageBackground, StyleSheet, Dimensions } from "react-native";
import CardStack, {
  Card as CardStackCard,
} from "react-native-card-stack-swiper";
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

interface Props {
  card: {
    image: {
      src: string;
    };
    genres: string[];
  };
}

const { width, height } = Dimensions.get("window");

export default function MovieCard({ card }: Props) {
  return (
    <CardStackCard style={styles.card}>
      <ImageBackground
        source={{ uri: card.image.src }}
        style={styles.cardImage}
      >
        <Ribbon type="SUGGESTION">Do you enjoy:</Ribbon>
        <LinearGradient
          style={styles.details}
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.6 }}
        >
          <VStack space={2} pb="60px">
            <HStack space={2} alignItems="center">
              {card.genres.slice(0, 3).map((genre, key) => (
                <GradientBadge key={key}>{genre}</GradientBadge>
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
    flexDirection: "column",
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
