import { Box, Flex, Text, VStack, Image } from "native-base";
import React from "react";
import { getFirstName } from "../utils/user";

interface Props {
  match: {
    name: string;
    image: {
      width?: number;
      height?: number;
      src: string;
    };
  };
  isFresh?: boolean;
}

export default function MatchCard({ match, isFresh }: Props) {
  return (
    <Flex w="80px" h="full" alignItems="center" mr={2}>
      <VStack h="80%" w="full">
        {isFresh && (
          <Box
            position="absolute"
            zIndex={1}
            w={4}
            h={4}
            top="40%"
            right={-8}
            rounded="full"
            bg="red.400"
            borderWidth={2}
            borderColor="white.50"
          />
        )}
        <Image
          source={match.image.src as any}
          alt={`Image of ${match.name}`}
          resizeMode="cover"
          rounded="md"
          bg="white.50"
          h="full"
        />
      </VStack>
      <Text mt={1} color="black" fontWeight="bold">
        {getFirstName(match.name)}
      </Text>
    </Flex>
  );
}
