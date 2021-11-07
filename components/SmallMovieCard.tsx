import { Box, Image } from "native-base";
import React from "react";

interface Props {
  source: { uri: string };
}

export default function SmallMovieCard({ source }: Props) {
  return <Image h="100px" w="67px" rounded="lg" shadow="2" source={source} />;
}
