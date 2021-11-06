import { Box, VStack, Text } from "native-base";
import React from "react";

export default function IceBreaker() {
  return (
    <VStack justifyContent="center" alignItems="center" pb={2}>
      <Text bold color="warmGray.600">
        ICEBREAKER
      </Text>
      <Text textAlign="center" color="warmGray.600">
        You both really like Julia Roberts movies
      </Text>
    </VStack>
  );
}
