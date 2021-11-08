import { Box, VStack, Text } from "native-base";
import React from "react";

export default function IceBreaker() {
  return (
    <VStack justifyContent="center" alignItems="center" pb={2}>
      <Text bold color="coolGray.200">
        ICEBREAKER
      </Text>
      <Text textAlign="center" color="coolGray.400">
        You both really like Julia Roberts movies
      </Text>
    </VStack>
  );
}
