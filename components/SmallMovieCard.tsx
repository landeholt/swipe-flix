import { Box, Center, Circle, IImageProps, Image, Text } from "native-base";
import React from "react";

interface Props extends IImageProps {
  source: { uri: string };
}

export default function SmallMovieCard({ source, ...props }: Props) {
  return (
    <Image
      h="90px"
      w="60px"
      rounded="lg"
      shadow="2"
      alt="Movie"
      bg="warmGray.200"
      fallbackElement={
        <Center
          h="90px"
          w="60px"
          bg="warmGray.200"
          rounded="lg"
          shadow="2"
          {...props}
        >
          <Text color="coolGray.600" fontSize="5xl">
            ?
          </Text>
        </Center>
      }
      source={source}
      {...props}
    />
  );
}
