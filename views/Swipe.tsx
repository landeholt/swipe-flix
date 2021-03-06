import { HStack, IconButton, Text, useDisclose } from "native-base";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../providers/auth";
import CardStack, {
  Card as CardStackCard,
} from "react-native-card-stack-swiper";
import CommonLayout from "../components/CommonLayout";
import { ImageBackground, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { matchModalStore, Profile, queueStore } from "../providers/state";
import _ from "lodash";
import MatchModal from "../components/MatchModal";
import CardSwitch from "../components/CardSwitch";

import { Ionicons, AntDesign } from "@expo/vector-icons";
import { getRandomMovies } from "../models/movie";
import { getAllTrailers } from "../models/trailer";
import EmptyCards from "../components/EmptyCards";

const { width, height } = Dimensions.get("window");

export default function Swipe() {
  const auth = useAuth();

  const userid = useMemo(() => auth && auth.session?.user?.id, [auth]);

  const username = useMemo(
    () => auth && auth.session?.user?.user_metadata.name,
    [auth]
  );

  const profiles = useRecoilValue(queueStore);

  const [direction, setDirection] = useState<"LEFT" | "RIGHT" | "IDLE">("IDLE");

  const cards = useMemo(() => {
    return _.shuffle([
      ...profiles.map((p) => ({ ...p, type: "PROFILE" as "PROFILE" })),
      ...getRandomMovies(2).map((p) => ({ ...p, type: "MOVIE" as "MOVIE" })),
      ...getAllTrailers(1).map((p) => ({
        id: 0,
        year: "",
        runtime: "",
        genres: [""],
        director: "",
        actors: "",
        plot: "",
        title: p.title,
        posterUrl: p.posterUrl,
        videoUrl:
          p.videoStreams.find((p) => p.category === "TRAILER")?.url ?? "",
        promoUrl: `https://www.filmstaden.se/film/${p.ncgId}/${p.slug}`,
        type: "AD" as "AD",
        description: `${_.random(
          1,
          180
        )} free seats at your nearest Filmstaden Cinema`,
      })),
    ]);
  }, [profiles]);

  const [numCards, setNumCards] = useState(cards.length);

  function upsert(oldQueue: Profile[], index: number): Profile[] {
    const _oldQueue = _.cloneDeep(oldQueue);
    const profile = _oldQueue[index];
    const state = direction === "LEFT" ? "DISLIKED" : "LIKED";
    _oldQueue.splice(index, 1, { ...profile, state });
    return _oldQueue;
  }

  const handleSwipe = useRecoilCallback(
    ({ snapshot, set }) =>
      async (index: number, direction: "LEFT" | "RIGHT") => {
        setNumCards(_.clamp(numCards - 1, 0, Infinity));
        const card = cards[index];

        const profile = card;
        set(queueStore, (old) => upsert(old, index));

        if (
          profile.type === "PROFILE" &&
          profile.willLike &&
          direction === "RIGHT"
        ) {
          set(matchModalStore, {
            profile,
          });
        }
      }
  );
  function handleDirection(x: number, y: number) {
    if (x < 0) {
      setDirection("LEFT");
    } else if (x > 0) {
      setDirection("RIGHT");
    } else {
      setDirection("IDLE");
    }
  }

  const ref = useRef(null);

  function swipeLeft() {
    if (ref.current) {
      /* @ts-ignore */
      ref.current.swipeLeft();
    }
  }

  function swipeRight() {
    if (ref.current) {
      /* @ts-ignore */

      ref.current.swipeRight();
    }
  }

  return (
    <>
      <MatchModal />
      <CommonLayout secondary safeArea p={3} position="relative">
        {numCards !== 0 && (
          <HStack
            position="absolute"
            w={width * 0.8}
            mx={8}
            zIndex={10}
            bottom="7%"
            justifyContent="space-evenly"
          >
            <IconButton
              onPress={swipeLeft}
              _icon={{
                as: Ionicons,
                name: "close",
                color: "emerald.400",
              }}
              bg={direction === "LEFT" ? "emerald.500" : "transparent"}
              borderColor="emerald.400"
              p={2}
              _focus={{
                bg: "emerald.500",
              }}
              _pressed={{
                bg: "emerald.500",
              }}
              variant="outline"
              rounded="full"
            />

            <IconButton
              onPress={swipeRight}
              _icon={{
                as: AntDesign,
                name: "heart",
                color: "red.500",
              }}
              borderColor="red.500"
              bg={direction === "RIGHT" ? "red.400" : "transparent"}
              p={2}
              _focus={{
                bg: "red.400",
              }}
              _pressed={{
                bg: "red.400",
              }}
              variant="outline"
              rounded="full"
            />
          </HStack>
        )}
        <CardStack
          ref={ref}
          disableBottomSwipe
          disableTopSwipe
          onSwipe={handleDirection}
          onSwipeEnd={() => setDirection("IDLE")}
          onSwipedLeft={(i) => handleSwipe(i, "LEFT")}
          onSwipedRight={(i) => handleSwipe(i, "RIGHT")}
          style={styles.content}
          renderNoMoreCards={() => <EmptyCards />}
        >
          {cards.map((card, key) => (
            <CardSwitch key={key} card={card} />
          ))}
        </CardStack>
      </CommonLayout>
    </>
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
