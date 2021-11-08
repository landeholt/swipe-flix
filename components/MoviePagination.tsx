import _ from "lodash";
import { FlatList, ScrollView } from "native-base";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  GestureResponderEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { Movie } from "../models/profile";
import SmallMovieCard from "./SmallMovieCard";

interface Props {
  data: Movie[];
}

const { width } = Dimensions.get("screen");
export default function MoviePagination({ data }: Props) {
  const [page, setPage] = useState(0);

  const [direction, setDirection] = useState<"LEFT" | "RIGHT" | "IDLE">("IDLE");
  const [x, setX] = useState(0);
  const itemsPerPage = 6;
  const maxPages = data.length / itemsPerPage;

  const _data = useMemo(
    () => data.slice(page * itemsPerPage, (page + 3) * itemsPerPage),
    [page]
  );

  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const _x = e.nativeEvent.contentOffset.x;
    if (_x > x) {
      setDirection("RIGHT");
    } else if (_x < x) {
      setDirection("LEFT");
    } else {
      setDirection("IDLE");
    }
    setX(_x);
  }

  function handleEnd(e: GestureResponderEvent) {
    if (direction === "RIGHT") {
      setPage(_.clamp(page + 1, 0, maxPages));
    }
    if (direction === "LEFT") {
      setPage(_.clamp(page - 1, 0, maxPages));
    }
  }

  return (
    <ScrollView
      horizontal
      snapToInterval={500}
      decelerationRate="fast"
      snapToAlignment="center"
      onScroll={handleScroll}
      scrollEventThrottle={32}
      onResponderRelease={handleEnd}
    >
      <FlatList
        data={_data}
        numColumns={9}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <SmallMovieCard
            h={`${(3 / 2) * (width / 3 - 14)}px`}
            w={`${width / 3 - 14}px`}
            shadow={0}
            mr={1}
            mb={2}
            source={{ uri: item.posterUrl }}
          />
        )}
      />
    </ScrollView>
  );
}
