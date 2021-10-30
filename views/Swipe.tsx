import { Text } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../providers/auth";
import CardStack, {
  Card as CardStackCard,
} from "react-native-card-stack-swiper";
import CommonLayout from "../components/CommonLayout";
import { ImageBackground, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

interface Card {
  name: string;
  genres: string[];
  imageURL: string;
}

export default function Swipe() {
  const auth = useAuth();
  const userid = useMemo(() => auth && auth.session?.user?.id, [auth]);

  const username = useMemo(
    () => auth && auth.session?.user?.user_metadata.name,
    [auth]
  );

  const [cards, setCards] = useState<Card[]>([]);

  // Load some bogus cards when this view is loaded.
  useEffect(() => {
    setCards([
      {
        name: "Kevin",
        genres: ["Cooking shows", "Fantasy"],
        imageURL:
          "https://static.wikia.nocookie.net/theoffice/images/b/b2/2009Kevincropped.PNG/revision/latest/scale-to-width-down/1000?cb=20170701083657",
      },
      {
        name: "Oscar",
        genres: ["Horror", "Psychological thrillers"],
        imageURL:
          "https://static.wikia.nocookie.net/theoffice/images/2/25/Oscar_Martinez.jpg/revision/latest/scale-to-width-down/1000?cb=20170701085818",
      },
      {
        name: "Michael",
        genres: ["Romantic comedies", "Children's programming"],
        imageURL:
          "https://static.wikia.nocookie.net/theoffice/images/b/be/Character_-_MichaelScott.PNG/revision/latest/scale-to-width-down/271?cb=20200413224550",
      },
    ]);
  }, []);
  return (
    <CommonLayout secondary safeArea>
      <CardStack
        style={styles.content}
        renderNoMoreCards={() => (
          <Text style={{ fontWeight: "700", fontSize: 18, color: "gray" }}>
            No more cards :(
          </Text>
        )}
      >
        {cards.map((c, i) => (
          <CardStackCard key={i} style={styles.card}>
            <ImageBackground
              source={{ uri: c.imageURL }}
              style={styles.cardImage}
            >
              <LinearGradient
                style={styles.details}
                colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.6 }}
              >
                <Text style={styles.header}>{c.name}</Text>
                <Text>{c.genres.join(" | ")}</Text>
              </LinearGradient>
            </ImageBackground>
          </CardStackCard>
        ))}
      </CardStack>
    </CommonLayout>
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
    width: width * 0.85,
    height: height * 0.8,
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  cardImage: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-end",
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
