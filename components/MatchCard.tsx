import { Box, Flex, Text, VStack, Image } from "native-base";
import React from "react";
import { getFirstName } from "../utils/user";

interface Props {
  match: {
    name: string;
    image: {
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
            borderColor="coolGray.800"
          />
        )}
        <Image
          source={{ uri: match.image.src as any }}
          alt={`Image of ${match.name}`}
          resizeMode="cover"
          rounded="md"
          bg="coolGray.700"
          h="full"
        />
      </VStack>
      <Text mt={1} color="white.50" fontWeight="bold">
        {getFirstName(match.name)}
      </Text>
    </Flex>
  );
}
