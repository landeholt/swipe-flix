import { Box, Circle, Image } from "native-base";
import React from "react";

interface Props {
  source: { uri: string };
}

export default function SmallMovieCard({ source }: Props) {
  return (
    <Image
      h="90px"
      w="60px"
      rounded="lg"
      shadow="2"
      alt="Movie"
      fallbackElement={
        <Box h="90px" w="60px" bg="warmGray.100" rounded="lg" shadow="2"></Box>
      }
      source={source}
    />
  );
}
