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
  Center,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text,
  VStack,
} from "native-base";
import * as WebBrowser from "expo-web-browser";
import GradientBadge from "./GradientBadge";
import SmallMovieCard from "./SmallMovieCard";

import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MainRoutes } from "../types/main";
import Ribbon from "./Ribbon";

interface Props {
  card: Partial<Movie> & {
    description: string;
    videoUrl: string;
    promoUrl: string;
  };
}

const { width, height } = Dimensions.get("window");

export default function AdCard({ card }: Props) {
  const navigator = useNavigation();

  function openVideo() {
    /* @ts-ignore */
    navigator.navigate(MainRoutes.VideoPlayer, {
      videoUrl: card.videoUrl,
    });
  }

  function openPromo() {
    if (
      card.promoUrl &&
      /https:\/\/www\.filmstaden\.se\/film\/.{9}\/.+/.test(card.promoUrl)
    ) {
      WebBrowser.openBrowserAsync(card.promoUrl);
    }
  }
  return (
    <CardStackCard style={styles.card}>
      <ImageBackground
        source={{ uri: card.posterUrl }}
        style={styles.cardImage}
      >
        <Ribbon type="AD">Filmstaden</Ribbon>
        <Flex
          h="full"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          left={0}
          right={0}
        >
          <Spacer />
          <IconButton
            onPress={openVideo}
            shadow="2"
            _icon={{
              as: Ionicons,
              name: "ios-play-circle-sharp",
              size: "2xl",
            }}
            _focus={{
              _icon: {
                color: "warmGray.200",
              },
            }}
            _pressed={{
              _icon: {
                color: "warmGray.200",
              },
            }}
            variant="unstyled"
            rounded="full"
          />
          <Spacer />
        </Flex>
        <LinearGradient
          style={styles.details}
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.6 }}
        >
          <VStack space={2} pb="60px">
            <Text bold fontSize="4xl">
              {card.title}
            </Text>

            <HStack space={1} alignItems="center">
              <Text noOfLines={3} isTruncated w={width * 0.7}>
                {card.description}
              </Text>
              <Spacer />
              <IconButton
                onPress={openPromo}
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
