import React from "react";
import { ImageBackground, StyleSheet, Dimensions } from "react-native";
import CardStack, {
  Card as CardStackCard,
} from "react-native-card-stack-swiper";
import { LinearGradient } from "expo-linear-gradient";
import { Movie } from "../models/profile";
import { Text } from "native-base";
interface Props {
  card: {
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
  return (
    <CardStackCard style={styles.card}>
      <ImageBackground
        source={{ uri: card.image.src }}
        style={styles.cardImage}
      >
        <LinearGradient
          style={styles.details}
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.6 }}
        >
          <Text style={styles.header}>{card.title}</Text>
          <Text>{card.genres.slice(0, 3).join(" | ")}</Text>
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
