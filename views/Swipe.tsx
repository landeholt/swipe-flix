import { Text, useDisclose } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
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

const { width, height } = Dimensions.get("window");

export default function Swipe() {
  const auth = useAuth();

  const userid = useMemo(() => auth && auth.session?.user?.id, [auth]);

  const username = useMemo(
    () => auth && auth.session?.user?.user_metadata.name,
    [auth]
  );

  const profiles = useRecoilValue(queueStore);

  const handleSwipe = useRecoilCallback(
    ({ snapshot, set }) =>
      async (index: number, direction: "LEFT" | "RIGHT") => {
        function upsert(oldQueue: Profile[]): Profile[] {
          const _oldQueue = _.cloneDeep(oldQueue);
          const profile = _oldQueue[index];
          const state = direction === "LEFT" ? "DISLIKED" : "LIKED";
          _oldQueue.splice(index, 1, { ...profile, state });
          return _oldQueue;
        }

        const profile = profiles[index];
        set(queueStore, upsert);

        if (profile.willLike && direction === "RIGHT") {
          set(matchModalStore, {
            profile,
          });
        }
      }
  );
  return (
    <>
      <MatchModal />
      <CommonLayout secondary safeArea p={3}>
        <CardStack
          disableBottomSwipe
          disableTopSwipe
          onSwipedLeft={(i) => handleSwipe(i, "LEFT")}
          onSwipedRight={(i) => handleSwipe(i, "RIGHT")}
          style={styles.content}
          renderNoMoreCards={() => (
            <Text style={{ fontWeight: "700", fontSize: 18, color: "gray" }}>
              No more cards :(
            </Text>
          )}
        >
          {profiles.map((c, i) => (
            <CardStackCard key={i} style={styles.card}>
              <ImageBackground
                source={{ uri: c.image.src }}
                style={styles.cardImage}
              >
                <LinearGradient
                  style={styles.details}
                  colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 0.6 }}
                >
                  <Text style={styles.header}>{c.name}</Text>
                  <Text>{c.uniqueGenres.slice(0, 3).join(" | ")}</Text>
                </LinearGradient>
              </ImageBackground>
            </CardStackCard>
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
